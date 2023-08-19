import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useThemeContext } from '../context/ThemeContext';
import GoogleButton from 'react-google-button';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
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
    const googleProvider = new GoogleAuthProvider();

    function handleGoogleSignIn() {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                console.log(res);

                toast.success("succesfully! google sign in", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
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
                    theme: "dark",
                });

            })
    }


    function handleLogout() {
        auth.signOut()
            .then((res) => {
                console.log(res)
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
            .catch((error) => {
                toast.error("Not able to  Logged out !", {
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
        <div>
            <AccountCircleIcon onClick={handleOpen} />
            {user && <LogoutIcon onClick={handleLogout} />}
            <Modal
                open={open}
                onClose={handleClose}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div style={{ width: "400px" }}>

                    <AppBar position='static' style={{ background: "transparent" }}>
                        <Tabs variant='fullWidth'
                            value={value}
                            onChange={handleValueChange}>
                            <Tab label="login" style={{ color: theme.textColor }}></Tab>
                            <Tab label="signup" style={{ color: theme.textColor }}></Tab>
                        </Tabs>
                    </AppBar>

                    {value === 0 && (<LoginForm handleClose={handleClose}/>)}
                    {value === 1 && (<SignupForm handleClose={handleClose}/>)}
                    <Box p={3} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: '20px', }}>
                        <span>OR</span>
                        <GoogleButton style={{ width: '100%' }}
                            onClick={handleGoogleSignIn} />
                    </Box>
                </div>
            </Modal>

        </div>
    )
}

export default AccountCircle




/*
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Modal, Tab, Tabs } from "@mui/material";
// import Login from "./Login";
// import { GoogleButton } from "react-google-button";
// import Signup from "./Signup";
import { useState } from "react";
// import { UseThemes } from "./GlobalContextFolder/MyThemeContext";

const AccountCircle = () => {
    const [isOpen, setOpen] = useState(false);
    const [value, setvalue] = useState(0);
    //   const { theme } = UseThemes();
    //   console.log(theme);

    const HandleModal = () => {
        setOpen(true);
    };

    const HandleClose = () => {
        setOpen(false);
    };
    const handleChangeVal = (event, v) => {
        setvalue(v);
    };

    return (
        <div>
            <AccountCircleIcon onClick={HandleModal} />
            <Modal
                open={isOpen}
                onClose={HandleClose}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                { <div style={{ width: "400px" }}>
          <AppBar position="static" style={{ background: "blue" }}>
            <Tabs variant="fullWidth" value={value} onChange={handleChangeVal}>
              <Tab label="Signup" style={{ color: theme.color }}></Tab>
              <Tab label="Login" style={{ color: theme.color }}></Tab>
            </Tabs>
          </AppBar>

          {value == 0 && <Signup />}
          {value == 1 && <Login />}
        </div> }

                { <GoogleButton
          style={{
            width: "100%",
            marginTop: "8px",
          }}
        /> }

//             </Modal>
//         </div>
//     );
// };
// export default AccountCircle;

*/