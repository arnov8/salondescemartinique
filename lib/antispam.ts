/**
 * Anti-spam utilities for form protection
 * Combines honeypot, Turnstile CAPTCHA, and pattern detection
 */

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY

export interface ValidationResult {
  success: boolean
  error?: string
  isSpam?: boolean
}

/**
 * Validates form submission with honeypot and Turnstile
 */
export async function validateSubmission(
  honeypot: string | undefined,
  turnstileToken: string | undefined
): Promise<ValidationResult> {
  // Check honeypot first (silent reject)
  if (honeypot) {
    return { success: false, isSpam: true }
  }

  // Validate Turnstile token
  if (!turnstileToken) {
    return { success: false, error: 'Vérification de sécurité requise' }
  }

  if (!TURNSTILE_SECRET_KEY) {
    console.warn('TURNSTILE_SECRET_KEY not configured, skipping validation')
    return { success: true }
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      }
    )

    const result = await response.json()

    if (!result.success) {
      console.warn('Turnstile validation failed:', result['error-codes'])
      return { success: false, error: 'Vérification de sécurité échouée. Veuillez réessayer.' }
    }

    return { success: true }
  } catch (error) {
    console.error('Turnstile verification error:', error)
    // Allow submission on Turnstile service failure
    return { success: true }
  }
}

/**
 * Detects obvious spam patterns in form data
 */
export function isObviousSpam(data: Record<string, unknown>): boolean {
  const textFields = Object.values(data)
    .filter((v): v is string => typeof v === 'string')
    .join(' ')

  // Check for excessive consonants (gibberish)
  const consonantPattern = /[bcdfghjklmnpqrstvwxz]{6,}/i
  if (consonantPattern.test(textFields)) {
    return true
  }

  // Check for suspicious URLs/links
  const urlPatterns = [
    /\[url=/i,
    /\[link=/i,
    /<a\s+href=/i,
    /http[s]?:\/\/[^\s]+\.(ru|cn|tk|ml|ga|cf|gq|top|xyz|click|link|work)/i,
  ]
  if (urlPatterns.some((p) => p.test(textFields))) {
    return true
  }

  // Check for HTML injection attempts
  const htmlPatterns = [
    /<script/i,
    /<iframe/i,
    /javascript:/i,
    /onclick=/i,
    /onerror=/i,
  ]
  if (htmlPatterns.some((p) => p.test(textFields))) {
    return true
  }

  // Check for common spam keywords
  const spamKeywords = [
    /\bcasino\b/i,
    /\bpoker\b/i,
    /\bviagra\b/i,
    /\bcrypto\s*currency/i,
    /\bbitcoin\s*invest/i,
    /\bmake\s*money\s*fast/i,
    /\bsex\s*video/i,
    /\bporn/i,
  ]
  if (spamKeywords.some((p) => p.test(textFields))) {
    return true
  }

  return false
}

/**
 * Returns a fake success response to fool bots
 */
export function silentRejectResponse() {
  return {
    success: true,
    message: 'Votre demande a été enregistrée avec succès.',
  }
}
