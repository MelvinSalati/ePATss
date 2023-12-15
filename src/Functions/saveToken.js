const saveLoginToken = (token, expiryTimeStamp, authenticated) => {
  console.log(authenticated)
  localStorage.setItem('token', token.token)
  localStorage.setItem('bearer', token.type)
  localStorage.setItem('isAuthenticated', authenticated)
}
export default saveLoginToken
