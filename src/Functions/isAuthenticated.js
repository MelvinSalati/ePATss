import React, { useState, useEffect } from 'react'

function checkAuthorizationStatus() {
  // useStae
  const [authenticated, setAuthenticated] = useState(true)

  // get todays date in js with time
  const today = new Date()
  console.log(today)
  // compare the vakue of token)epirey_date stored in localStogare

  const expiryDate = localStoarage.getItem('token_expiry_date')

  useEffect(() => {
    const checkValidity = () => {
      if (today > expiryDate) {
        return false
      }
      checkValidity()
      return true
    }
  }, [])
}

export default checkAuthorizationStatus
