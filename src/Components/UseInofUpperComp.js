import React, { useState } from 'react'
import { Balance, } from '@mui/icons-material';
import { Box, Button, Modal, TextField, Tooltip } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import { useTestMode } from '../context/TestModeContext';
import { useNavigate } from 'react-router-dom';

const UseInofUpperComp = () => {
    const [open, setIsOpen] = useState(false);
    const [frEmail, setfrEmail] = useState("")
    let { theme } = useThemeContext();
    let { curr_user_data } = useTestMode();
    const navigate = useNavigate();


    function handleOpen() {
        setIsOpen(true)
    }
    function handleClose() {
        setIsOpen(false)
    }
    function handleSubmit() {
        // console.log(frEmail)
        if (!frEmail.trim() || !frEmail.includes("@")) {
            toast.error("Incorrect email!")
        }
        //if curr user data is less the 2
        else if (curr_user_data.length < 2) {
            toast.error("you will have to atttempt at least 2 test for comparison with Friend!",)

        } else {
            sessionStorage.setItem("frEmail", frEmail)
            navigate('/compare')
        }
        handleClose()

    }
    function handleToperSubmit() {
        if (curr_user_data.length < 2) {
            toast.error("Please attempt at least 2 test for comparison with Topper!")
            handleClose()
        } else {

            navigate("/topper")
        }
    }

    return (
        <>
            <Tooltip title="Clicked here to Compare With Your Friend OR Topper"
                placement="bottom" arrow
            >
                <div className='user-info compare' onClick={handleOpen}>
                    <h1>Compare With Your Friend OR Topper</h1>

                    <Balance style={{ fontSize: "100px" }} />
                    {/* <Leaderboard onClick={() => navigate("/topper")} /> */}
                </div>
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: theme.background,
                    // background: theme.modalBackground,
                }}
            >
                <div style={{ width: "400px", border: `2px solid ${theme.textColor}`, outline: 'none' }}>

                    <Box p={3} style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: '20px',
                        background: `${theme.modalBackground ?? theme.background}`
                    }}>
                        <div style={{ textAlign: "left", fontSize: "20px" }}>Enter Email of your friend*</div>
                        <TextField
                            variant="outlined"
                            label="Enter Email"
                            type='email'
                            fullWidth
                            onChange={(e) => setfrEmail(e.target.value)}
                            InputLabelProps={{
                                style: { color: theme.textColor }
                            }}
                            inputProps={{
                                style: { color: theme.textColor }
                            }}

                            // style={{ border: `2px solid ${theme.textColor}`,outline:"none" }}
                            style={{ outline: "none" }}

                        />

                        <Button
                            variant='contained'
                            size='large' onClick={handleSubmit}
                            style={{ background: theme.textColor, color: theme.background }}
                            fullWidth>Submit</Button>

                        <div>OR</div>
                        <h3>Want to Compare with Topper?</h3>

                        <Tooltip title="Clicked here to Compare With Topper"
                            placement="bottom" arrow
                        >


                            <Button
                                variant='contained'
                                size='large'
                                style={{ background: theme.textColor, color: theme.background }}
                                fullWidth
                                onClick={handleToperSubmit}>Topper</Button>
                        </Tooltip>

                    </Box>
                </div>
            </Modal>
        </>
    )
}

export default UseInofUpperComp