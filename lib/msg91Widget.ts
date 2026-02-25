type Msg91WidgetResult = {
  ok: boolean;
  error?: string;
  reqId?: string;
  accessToken?: string;
};

declare global {
  interface Window {
    initSendOTP?: (configuration: Record<string, unknown>) => void;
    sendOtp?: (
      identifier: string,
      success?: (data: unknown) => void,
      failure?: (error: unknown) => void,
    ) => void;
    retryOtp?: (
      channel: string | null,
      success?: (data: unknown) => void,
      failure?: (error: unknown) => void,
      reqId?: string,
    ) => void;
    verifyOtp?: (
      otp: string | number,
      success?: (data: unknown) => void,
      failure?: (error: unknown) => void,
      reqId?: string,
    ) => void;
    getWidgetData?: () => unknown;
    isCaptchaVerified?: () => boolean;
    configuration?: Record<string, unknown>;
  }
}

let sdkLoadPromise: Promise<void> | null = null;

async function waitForMethod(
  getMethod: () => unknown,
  timeoutMs = 4000,
  stepMs = 100,
) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    if (typeof getMethod() === 'function') {
      return true;
    }

    await new Promise((resolve) => setTimeout(resolve, stepMs));
  }

  return false;
}

function extractReqId(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object') {
    return undefined;
  }

  const data = payload as Record<string, unknown>;
  const directReqId = data.reqId;
  if (typeof directReqId === 'string' && directReqId.length > 0) {
    return directReqId;
  }

  const nestedData = data.data;
  if (nestedData && typeof nestedData === 'object') {
    const nestedReqId = (nestedData as Record<string, unknown>).reqId;
    if (typeof nestedReqId === 'string' && nestedReqId.length > 0) {
      return nestedReqId;
    }
  }

  return undefined;
}

function extractAccessToken(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object') {
    return undefined;
  }

  const data = payload as Record<string, unknown>;
  const directToken =
    data.accessToken ||
    data.access_token ||
    data.token ||
    data.jwt_token ||
    data.jwtToken ||
    data['access-token'];

  if (typeof directToken === 'string' && directToken.length > 0) {
    return directToken;
  }

  const nestedData = data.data;
  if (nestedData && typeof nestedData === 'object') {
    const nested = nestedData as Record<string, unknown>;
    const nestedToken =
      nested.accessToken ||
      nested.access_token ||
      nested.token ||
      nested.jwt_token ||
      nested.jwtToken ||
      nested['access-token'];

    if (typeof nestedToken === 'string' && nestedToken.length > 0) {
      return nestedToken;
    }
  }

  return undefined;
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load MSG91 SDK script'));
    document.body.appendChild(script);
  });
}

async function waitForDomElement(elementId: string, timeoutMs = 2000, stepMs = 50): Promise<boolean> {
  const start = Date.now();
  
  while (Date.now() - start < timeoutMs) {
    const element = document.getElementById(elementId);
    if (element) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, stepMs));
  }
  
  return false;
}

export async function initMsg91Widget(identifier: string, captchaRenderId?: string, retryCount = 0) {
  const widgetId = process.env.NEXT_PUBLIC_MSG91_WIDGET_ID;
  const tokenAuth = process.env.NEXT_PUBLIC_MSG91_TOKEN_AUTH;

  if (!widgetId || !tokenAuth) {
    throw new Error('MSG91 widget is not configured. Add NEXT_PUBLIC_MSG91_WIDGET_ID and NEXT_PUBLIC_MSG91_TOKEN_AUTH.');
  }

  // If captchaRenderId is provided, wait for the DOM element to exist
  if (captchaRenderId) {
    const elementExists = await waitForDomElement(captchaRenderId);
    if (!elementExists) {
      console.warn(`MSG91: Captcha container '${captchaRenderId}' not found in DOM`);
      if (retryCount < 3) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return initMsg91Widget(identifier, captchaRenderId, retryCount + 1);
      }
      throw new Error(`MSG91: Captcha container '${captchaRenderId}' not found after retries`);
    }
  }

  // Load the SDK script
  if (!sdkLoadPromise) {
    sdkLoadPromise = loadScript('https://verify.msg91.com/otp-provider.js');
  }

  await sdkLoadPromise;

  // Wait a bit for the SDK to fully initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  // Check if captcha is already verified - if so, don't clear it
  const isCaptchaAlreadyVerified = typeof window.isCaptchaVerified === 'function' && window.isCaptchaVerified();
  console.log('MSG91: Captcha already verified:', isCaptchaAlreadyVerified);

  // Clear the captcha container before reinitializing ONLY if captcha is not verified
  if (captchaRenderId && !isCaptchaAlreadyVerified) {
    const container = document.getElementById(captchaRenderId);
    if (container) {
      console.log('MSG91: Clearing captcha container for fresh init');
      container.innerHTML = '';
    }
  }

  const configuration = {
    widgetId,
    tokenAuth,
    identifier,
    exposeMethods: true,
    captchaRenderId: captchaRenderId || '',
    success: () => undefined,
    failure: () => undefined,
  };

  window.configuration = configuration;

  if (typeof window.initSendOTP === 'function') {
    console.log('MSG91: Calling initSendOTP with config:', { widgetId, identifier: identifier || '(empty)', captchaRenderId });
    window.initSendOTP(configuration);
    
    // Wait for the captcha to actually render (only on first init)
    if (captchaRenderId && !isCaptchaAlreadyVerified) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    return;
  }

  throw new Error('MSG91 SDK did not initialize correctly.');
}

export async function sendOtpWithMsg91(
  identifier: string,
  captchaRenderId?: string,
): Promise<Msg91WidgetResult> {
  // Always reinitialize with the actual identifier before sending OTP
  // This ensures the widget has the correct phone number
  console.log('MSG91: Reinitializing widget with identifier before sending OTP');
  await initMsg91Widget(identifier, captchaRenderId);

  const isMethodReady = await waitForMethod(() => window.sendOtp);
  if (!isMethodReady) {
    const widgetData = window.getWidgetData?.();
    const captchaVerified = window.isCaptchaVerified?.();
    return {
      ok: false,
      error: `MSG91 sendOtp method is unavailable. Check widgetId/tokenAuth or SDK initialization. widgetData=${JSON.stringify(widgetData ?? null)} captchaVerified=${String(captchaVerified ?? false)}`,
    };
  }

  if (typeof window.sendOtp !== 'function') {
    return { ok: false, error: 'MSG91 sendOtp method is unavailable.' };
  }

  // Check if captcha is verified before attempting to send OTP
  if (typeof window.isCaptchaVerified === 'function') {
    const isCaptchaVerified = window.isCaptchaVerified();
    console.log('MSG91: Captcha verification status:', isCaptchaVerified);
    if (!isCaptchaVerified) {
      return {
        ok: false,
        error: 'Please complete the captcha verification before sending OTP.',
      };
    }
  }

  console.log('MSG91: Calling sendOtp with identifier:', identifier);

  return new Promise((resolve) => {
    let settled = false;
    const timeout = setTimeout(() => {
      if (settled) {
        return;
      }
      settled = true;
      const captchaStatus = window.isCaptchaVerified?.() ? 'verified' : 'not verified';
      console.error('MSG91: sendOtp timed out. Captcha status:', captchaStatus);
      resolve({
        ok: false,
        error: `MSG91 sendOtp timed out (captcha: ${captchaStatus}). Please try again.`,
      });
    }, 15000);

    console.log('MSG91: Invoking window.sendOtp()');
    window.sendOtp?.(
      identifier,
      (data) => {
        console.log('MSG91: sendOtp success callback received', data);
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timeout);
        resolve({ ok: true, reqId: extractReqId(data) });
      },
      (error) => {
        console.error('MSG91: sendOtp failure callback received', error);
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timeout);
        resolve({ ok: false, error: JSON.stringify(error) });
      },
    );
  });
}

export async function retryOtpWithMsg91(reqId?: string): Promise<Msg91WidgetResult> {
  const isMethodReady = await waitForMethod(() => window.retryOtp);
  if (!isMethodReady) {
    return { ok: false, error: 'MSG91 retryOtp method is unavailable.' };
  }

  if (typeof window.retryOtp !== 'function') {
    return { ok: false, error: 'MSG91 retryOtp method is unavailable.' };
  }

  return new Promise((resolve) => {
    let settled = false;
    const timeout = setTimeout(() => {
      if (settled) {
        return;
      }
      settled = true;
      resolve({ ok: false, error: 'MSG91 retryOtp timed out. Please try again.', reqId });
    }, 15000);

    window.retryOtp?.(
      null,
      (data) => {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timeout);
        resolve({ ok: true, reqId: extractReqId(data) ?? reqId });
      },
      (error) => {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timeout);
        resolve({ ok: false, error: JSON.stringify(error), reqId });
      },
      reqId,
    );
  });
}

export async function verifyOtpWithMsg91(otp: string, reqId?: string): Promise<Msg91WidgetResult> {
  const isMethodReady = await waitForMethod(() => window.verifyOtp);
  if (!isMethodReady) {
    return { ok: false, error: 'MSG91 verifyOtp method is unavailable.' };
  }

  if (typeof window.verifyOtp !== 'function') {
    return { ok: false, error: 'MSG91 verifyOtp method is unavailable.' };
  }

  return new Promise((resolve) => {
    let settled = false;
    const timeout = setTimeout(() => {
      if (settled) {
        return;
      }
      settled = true;
      resolve({ ok: false, error: 'MSG91 verifyOtp timed out. Please try again.', reqId });
    }, 15000);

    window.verifyOtp?.(
      otp,
      (data) => {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timeout);
        resolve({
          ok: true,
          reqId: extractReqId(data) ?? reqId,
          accessToken: extractAccessToken(data),
        });
      },
      (error) => {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timeout);
        resolve({ ok: false, error: JSON.stringify(error), reqId });
      },
      reqId,
    );
  });
}
