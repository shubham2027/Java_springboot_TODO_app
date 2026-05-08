const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,30}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateUsername(username) {
  if (!username?.trim()) {
    return 'Username is required'
  }
  if (!USERNAME_REGEX.test(username.trim())) {
    return 'Username must be 3-30 characters and use letters, numbers, or _'
  }
  return ''
}

export function validateEmail(email) {
  if (!email?.trim()) {
    return 'Email is required'
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Enter a valid email address'
  }
  return ''
}

export function validatePassword(password) {
  if (!password) {
    return 'Password is required'
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters'
  }
  return ''
}
