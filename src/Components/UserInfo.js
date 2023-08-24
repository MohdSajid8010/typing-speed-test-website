import { AccountCircle } from '@mui/icons-material'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../FirebaseConfig'

const UserInfo = ({ data }) => {
    const [user] = useAuthState(auth)
    // console.log(user, data)
    function maxWPM_AVG() {
        let sum = 0;
        let maxWpm = 0;
        data.map((obj) => {
            sum = sum + obj.wpm
            if (obj.wpm > maxWpm) {
                maxWpm = obj.wpm;
            }
        })
        // console.log(sum)
        return { "wpm": maxWpm, "avg": Math.round((sum / data.length)) || 0 }
    }
    return (
        <div className='user-info'>
            <div className='user'>
                <div className='picture'>
                    <AccountCircle style={{ fontSize: "100px" }} />
                </div>

                <div className='info'>
                    <div className='email'>{user.email} </div>
                    <div className='joined-at'>{user.metadata.creationTime}</div>
                </div>
            </div>

            <div className='user-total-test'>
                <div >Total Test : {data.length} </div>
                <div >Maximum WPM : {maxWPM_AVG().wpm}</div>
                <div >Average WPM : {maxWPM_AVG().avg}</div>

            </div>
        </div>
    )
}

export default UserInfo