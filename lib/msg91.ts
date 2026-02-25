type Msg91Result = {
  ok: boolean;
  error?: string;
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function normalizeIndianPhone(input: string) {
  const digits = onlyDigits(input);

  if (digits.length === 10) {
    return `91${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return digits;
  }

  return "";
}

function getMsg91Config() {
  const authKey =
    process.env.MSG91_WIDGET_AUTH_KEY ||
    process.env.MSG91_AUTH_KEY ||
    process.env.MSG91_API_KEY ||
    "";
  const templateId = process.env.MSG91_TEMPLATE_ID || "";

  return { authKey, templateId };
}

export async function sendMsg91Otp(phone: string): Promise<Msg91Result> {
  const { authKey, templateId } = getMsg91Config();

  if (!authKey || !templateId) {
    return {
      ok: false,
      error: "MSG91 is not configured. Add MSG91_AUTH_KEY and MSG91_TEMPLATE_ID.",
    };
  }

  const url = new URL("https://control.msg91.com/api/v5/otp");
  url.searchParams.set("template_id", templateId);
  url.searchParams.set("mobile", phone);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      authkey: authKey,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    return {
      ok: false,
      error: `Failed to send OTP via MSG91. ${errorText}`,
    };
  }

  return { ok: true };
}

export async function verifyMsg91Otp(phone: string, otp: string): Promise<Msg91Result> {
  const { authKey } = getMsg91Config();

  if (!authKey) {
    return {
      ok: false,
      error: "MSG91 is not configured. Add MSG91_AUTH_KEY.",
    };
  }

  const url = new URL("https://control.msg91.com/api/v5/otp/verify");
  url.searchParams.set("mobile", phone);
  url.searchParams.set("otp", otp);

  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        authkey: authKey,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    
    // MSG91 API returns success/error in the response body, not just HTTP status
    if (data.type === "success") {
      return { ok: true };
    }

    // OTP verification failed
    return {
      ok: false,
      error: data.message || `Invalid or expired OTP. ${data.type}`,
    };
  } catch (error) {
    console.error("MSG91 OTP verification error:", error);
    return {
      ok: false,
      error: `Failed to verify OTP: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

export async function verifyMsg91AccessToken(accessToken: string): Promise<Msg91Result> {
  const { authKey } = getMsg91Config();

  if (!authKey) {
    return {
      ok: false,
      error: "MSG91 is not configured. Add MSG91_WIDGET_AUTH_KEY or MSG91_AUTH_KEY.",
    };
  }

  try {
    const response = await fetch("https://control.msg91.com/api/v5/widget/verifyAccessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authkey: authKey,
        "access-token": accessToken,
      }),
    });

    const data = await response.json();
    
    // Check if the response indicates success
    if (data.type === "success" || (data.success !== undefined && data.success)) {
      return { ok: true };
    }

    return {
      ok: false,
      error: data.message || `Access token verification failed. ${data.type}`,
    };
  } catch (error) {
    console.error("MSG91 access token verification error:", error);
    return {
      ok: false,
      error: `Failed to verify access token: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
