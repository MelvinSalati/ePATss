import Notiflix from 'notiflix'

export default function isValidate(email, password) {
  const isEmailEmpty = !email || email.trim().length === 0
  const isPasswordEmpty = !password || password.trim().length === 0
  if (isEmailEmpty || isPasswordEmpty) {
    Notiflix.Notify.failure('Sorry, required form field(s) are empty!')
    return false
  }

  return true
}
