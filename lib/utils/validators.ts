// lib/utils/validators.ts

/**
 * Validate password strength
 * Returns an object with score and feedback
 */
export function validatePasswordStrength(password: string): {
  score: number
  feedback: string
} {
  let score = 0
  const feedback: string[] = []

  if (password.length < 8) {
    feedback.push('At least 8 characters')
  } else {
    score += 1
  }

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Include uppercase and lowercase letters')
  }

  if (/\d/.test(password)) {
    score += 1
  } else {
    feedback.push('Include at least one number')
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push('Include at least one special character')
  }

  // Map score to text (but only used for display, we return it)
  const strengthLabels: Record<number, string> = {
    0: 'Very Weak',
    1: 'Weak',
    2: 'Fair',
    3: 'Strong',
    4: 'Very Strong',
  }

  return {
    score,
    feedback: feedback.length > 0 ? feedback.join(', ') : 'Strong password!',
  }
}