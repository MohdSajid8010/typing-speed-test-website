import { AccountCircle } from '@mui/icons-material'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../FirebaseConfig'

const UserInfo = ({ totalTestTaken }) => {
    const [user] = useAuthState(auth)
    console.log(user)
    return (
        <div className='user-info'>
            <div className='user'>
                <div className='picture'>
                    <AccountCircle style={{fontSize:"100px"}}/>
                </div>

                <div className='info'>
                    <div className='email'>{user.email} </div>
                    <div className='joined-at'>{user.metadata.creationTime}</div>
                </div>
            </div>

            <div className='user-total-test'>Total Test :{totalTestTaken} </div>
        </div>
    )
}

export default UserInfo