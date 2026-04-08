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

  // Turnstile temporairement désactivé
  if (!turnstileToken) {
    console.warn('Turnstile token missing - skipping validation')
    return { success: true }
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
 * Returns the matched pattern name for logging, or null if not spam
 */
export function detectSpamPattern(data: Record<string, unknown>): string | null {
  // Only check user-entered text fields, skip emails and phone numbers
  const skipKeys = new Set(['email', 'phone', 'honeypot', 'fax', 'website'])
  const textFields = Object.entries(data)
    .filter(([key, v]) =>
      typeof v === 'string' &&
      !skipKeys.has(key)
    )
    .map(([, v]) => v as string)
    .join(' ')

  // Check for excessive consonants (gibberish) - raised to 8+ to avoid French acronyms
  const consonantPattern = /[bcdfghjklmnpqrstvwxz]{8,}/i
  if (consonantPattern.test(textFields)) {
    const match = textFields.match(consonantPattern)
    return `consonants: "${match?.[0]}"`
  }

  // Check for suspicious URLs/links
  const urlPatterns: [RegExp, string][] = [
    [/\[url=/i, '[url='],
    [/\[link=/i, '[link='],
    [/<a\s+href=/i, '<a href='],
    [/http[s]?:\/\/[^\s]+\.(ru|cn|tk|ml|ga|cf|gq|top|xyz|click|link|work)/i, 'suspicious URL'],
  ]
  for (const [pattern, name] of urlPatterns) {
    if (pattern.test(textFields)) {
      return `url: "${name}"`
    }
  }

  // Check for HTML injection attempts
  const htmlPatterns: [RegExp, string][] = [
    [/<script/i, '<script'],
    [/<iframe/i, '<iframe'],
    [/javascript:/i, 'javascript:'],
    [/onclick=/i, 'onclick='],
    [/onerror=/i, 'onerror='],
  ]
  for (const [pattern, name] of htmlPatterns) {
    if (pattern.test(textFields)) {
      return `html: "${name}"`
    }
  }

  // Check for common spam keywords
  const spamKeywords: [RegExp, string][] = [
    [/\bcasino\b/i, 'casino'],
    [/\bpoker\b/i, 'poker'],
    [/\bviagra\b/i, 'viagra'],
    [/\bcrypto\s*currency/i, 'cryptocurrency'],
    [/\bbitcoin\s*invest/i, 'bitcoin invest'],
    [/\bmake\s*money\s*fast/i, 'make money fast'],
    [/\bsex\s*video/i, 'sex video'],
    [/\bporn/i, 'porn'],
  ]
  for (const [pattern, name] of spamKeywords) {
    if (pattern.test(textFields)) {
      return `keyword: "${name}"`
    }
  }

  return null
}

/**
 * @deprecated Use detectSpamPattern() instead for better logging
 */
export function isObviousSpam(data: Record<string, unknown>): boolean {
  return detectSpamPattern(data) !== null
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
