import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useThemeContext } from '../context/ThemeContext';
import GoogleButton from 'react-google-button';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from '../FirebaseConfig';
import { toast } from 'react-toastify';
import errorObject from '../utils/errorObject';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';


const AccountCircle = () => {
    const [open, setIsOpen] = useState(false);
    const [value, setvalue] = useState(0);
    let { theme } = useThemeContext();
    // const user = auth.currentUser;
    const [user] = useAuthState(auth);//return arr


    const navigate = useNavigate();
    function handleOpen() {
        if (user) {
            navigate('/user')
        } else {

            setIsOpen(true)
        }
    }
    function handleClose() {
        setIsOpen(false)
    }
    function handleValueChange(e, v) {
        console.log(e, v)
        setvalue(v)
    }
    // Create an instance of the Google provider object:
    const googleProvider = new GoogleAuthProvider();

    function handleGoogleSignIn() {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                console.log(res.user);

                toast.success("succesfully! google sign in", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: {
                        color: "green",
                    },
                });

                handleClose()
            }).catch((err) => {
                console.log(err);

                toast.error(errorObject[err.code] || 'some err occured in google sigh in', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: {
                        color: "red",
                    },
                });

            })
    }


    function handleLogout() {
        signOut(auth)
            .then(() => {
                console.log("logout succeccfully!")
                toast.success("logged out successfully!", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: {
                        color: "green",
                    },
                });
            })
            .catch((err) => {
                toast.error(errorObject[err.code] || "Not able to Logged out !", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    style: {
                        color: "red",
                    },
                });
            });
    };
    return (
        <div >
            <AccountCircleIcon onClick={handleOpen} style={{ marginLeft: '10px' }} className='icons' />
            {user && <LogoutIcon onClick={handleLogout} style={{ marginLeft: '10px' }} className='icons' />}
            <Modal
                open={open}
                onClose={handleClose}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // background: theme.background,


                }}
            >
                <div style={{ width: "400px", border: `2px solid ${theme.textColor}`, outline: 'none' }}>

                    <AppBar position='static' style={{ background: `${theme.background}` }}>
                        <Tabs variant='fullWidth'
                            value={value}
                            onChange={handleValueChange}
                        // textColor={theme.textColor}
                        // indicatorColor={theme.textColor}
                        >

                            <Tab label="login" style={{ color: theme.textColor }}></Tab>
                            <Tab label="signup" style={{ color: theme.textColor }}></Tab>
                        </Tabs>
                    </AppBar>

                    {value === 0 && (<LoginForm handleClose={handleClose} />)}
                    {value === 1 && (<SignupForm handleClose={handleClose} />)}
                    <Box p={3} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: '20px', background: `${theme.background}` }}>
                        <span>OR</span>
                        <GoogleButton  // type="light" //  disabled  // label='Be Cool'
                            style={{ width: '100%', }}
                            onClick={handleGoogleSignIn} />
                    </Box>
                </div>
            </Modal>

        </div>
    )
}

export default AccountCircle



