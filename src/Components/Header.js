import React from 'react'
import AccountCircle from './AccountCircle'

const Header = () => {
  return (
    <div className='header'>
      <div className='logo'>TypeMomentum</div>
      <div className='user-icon'>
        <AccountCircle />
      </div>
    </div>
  )
}

export default Header