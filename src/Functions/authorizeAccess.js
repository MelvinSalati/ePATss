function authorizeAccess() {
  header: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}
