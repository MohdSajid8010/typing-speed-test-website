
import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useThemeContext } from '../context/ThemeContext';
import { auth } from '../FirebaseConfig';
import { toast } from 'react-toastify';
import errorObject from '../utils/errorObject';

const SignupForm = ({ handleClose }) => {
    const [signupData, setSignupData] = useState({ email: "", pass: "", cpass: "" })
    const { theme } = useThemeContext()
    function handleSignup() {
        if (!signupData.email.trim() || !signupData.pass.trim() || !signupData.cpass.trim()) {
            // alert("All field is mandatory!");
            toast.warn("All field is mandatory to sign up!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        if (signupData.pass.trim() !== signupData.cpass.trim()) {
            // alert("Password not math")
            toast.warn("Password not match!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }
        console.log(signupData)
        auth.createUserWithEmailAndPassword(signupData.email.trim(), signupData.pass.trim())
            .then((res) => {
                console.log(res)
                // alert("user created!")
                toast.success("user created succesfully!", {
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
                localStorage.setItem(`${signupData.email}`, JSON.stringify(signupData.pass))
                handleClose()
            }).catch((err) => {
                console.log(err, err.code, "somethig went wrong1")
                // alert("somethig went wrong1")
                toast.error(errorObject[err.code] || 'some err occured in sign up', {
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
    return (
        <Box
            p={3} style={{

                display: "flex",
                flexDirection: "column",
                gap: "20px",
                background: `${theme.background}`
            }}>
            <TextField
                type='email'
                label="Enter Email"
                variant="outlined"
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                InputLabelProps={{
                    style: { color: theme.textColor, }
                }}
                inputProps={{
                    style: { color: theme.textColor, }

                }}
            />
            <TextField
                variant='outlined'
                label="Enter Password"
                type='password'
                onChange={(e) => setSignupData({ ...signupData, pass: e.target.value })}
                InputLabelProps={{
                    style: { color: theme.textColor }
                }}
                inputProps={{
                    style: { color: theme.textColor }
                }}
            />

            <TextField
                variant='outlined'
                label="Enter Confirmed Password"
                type='password'
                onChange={(e) => setSignupData({ ...signupData, cpass: e.target.value })}
                InputLabelProps={{
                    style: { color: theme.textColor }
                }}
                inputProps={{
                    style: { color: theme.textColor }
                }}
            />



            <Button
                variant='contained'
                size='large' onClick={handleSignup}
                style={{ background: theme.textColor, color: theme.background }} >Signup</Button>
        </Box>
    )
}

export default SignupForm