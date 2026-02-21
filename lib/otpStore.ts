// In-memory OTP store (use Redis in production for distributed systems)
interface OtpData {
  otp: string
  expiresAt: number
}

class OtpStore {
  private store: Map<string, OtpData>

  constructor() {
    this.store = new Map()
    
    // Clean up expired OTPs every minute
    setInterval(() => {
      const now = Date.now()
      for (const [phone, data] of this.store.entries()) {
        if (data.expiresAt < now) {
          this.store.delete(phone)
        }
      }
    }, 60000)
  }

  set(phone: string, otp: string, expiryMinutes: number = 5) {
    const expiresAt = Date.now() + expiryMinutes * 60 * 1000
    this.store.set(phone, { otp, expiresAt })
  }

  get(phone: string): OtpData | undefined {
    return this.store.get(phone)
  }

  delete(phone: string): boolean {
    return this.store.delete(phone)
  }

  isExpired(phone: string): boolean {
    const data = this.store.get(phone)
    if (!data) return true
    return data.expiresAt < Date.now()
  }
}

// Export singleton instance
export const otpStore = new OtpStore()
