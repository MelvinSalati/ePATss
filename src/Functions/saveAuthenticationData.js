// Stores authentication on device;
function saveAuthenticationData(token, expire, user) {
  localStorage.setItem('token', token)
  localStorage.setItem('token_expiry_date', expire)
  localStorage.setItem('user_id', user)
}
export default saveAuthenticationData
