import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useThemeContext } from '../context/ThemeContext'
import { auth } from '../FirebaseConfig'
import { toast } from 'react-toastify';
import errorObject from '../utils/errorObject';

const LoginForm = ({handleClose}) => {
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const { theme } = useThemeContext()


    function handleLogin() {
        if (!loginData.email.trim() || !loginData.password.trim()) {
            // alert("All field is mandatory to login!");
            toast.warn("All field is mandatory to login!", {
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

        console.log(loginData)
        auth.signInWithEmailAndPassword(loginData.email.trim(), loginData.password.trim())
            .then((res) => {
                console.log(res)
                // alert("user login succesfully!")
                toast.success("user login succesfully!", {
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
                console.log(err, err.code, "somethig went wrong1")
                // alert("invalid creadential!")

                toast.error(errorObject[err.code] || 'some err occured!', {
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
    return (
        <Box
            p={3} style={{

                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}>
            <TextField
                variant="outlined"
                label="Enter Email"
                type='email'
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                InputLabelProps={{
                    style: { color: theme.textColor }
                }}
                inputProps={{
                    style: { color: theme.textColor }
                }}
            />
            <TextField
                variant='outlined'
                label="Enter Password"
                type='password'
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                InputLabelProps={{
                    style: { color: theme.textColor }
                }}
                inputProps={{
                    style: { color: theme.textColor }
                }}
            />



            <Button
                variant='contained'
                size='large' onClick={handleLogin}
                style={{ background: theme.textColor, color: theme.background }}>Login</Button>
        </Box>
    )
}

export default LoginForm