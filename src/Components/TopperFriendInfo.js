import { AccountCircle } from '@mui/icons-material'
import React from 'react'

const TopperFriendInfo = ({ curr_userObj, topper_ORfriendObj, vs }) => {

    // console.log("curr_userObj", curr_userObj
    //     , topper_ORfriendObj)

    return (
        <div className='user-info user-info2'>
            <div className='user you'>
                <div className='picture'>
                    <AccountCircle style={{ fontSize: "100px" }} />
                </div>

                <div className='info'>
                    <div className='email'>YOU</div>
                    <div className='email'>{curr_userObj.userEmail}</div>
                    <div className='joined-at'>joined - 23 /dfs/4</div>
                </div>
            </div>

            <div className='user topper_friend'>
                <div className='picture'>
                    <AccountCircle style={{ fontSize: "100px" }} />
                </div>

                <div className='info'>
                    <div className='email'>{vs.toUpperCase()}</div>
                    <div className='email'>{topper_ORfriendObj.userEmail} </div>
                    <div className='joined-at'>joined - 23 /dfs/4</div>
                </div>
            </div>
        </div>
    )
}

export default TopperFriendInfo