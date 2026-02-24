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
  const authKey = process.env.MSG91_AUTH_KEY || process.env.MSG91_API_KEY || "";
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
      error: `Invalid or expired OTP. ${errorText}`,
    };
  }

  return { ok: true };
}
