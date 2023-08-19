import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react'
import { useThemeContext } from '../context/ThemeContext';

const UserDataTable = ({ data }) => {
    console.log(data);
    let { theme } = useThemeContext()
    const cellStyle = { color: theme.textColor, textAlign: 'center' }



    return (
        <div className='table' >
            <TableContainer>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={cellStyle}>wpm</TableCell>
                            <TableCell style={cellStyle}>accuracy</TableCell>
                            <TableCell style={cellStyle}>character</TableCell>
                            <TableCell style={cellStyle}>Date</TableCell>


                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            data.length > 0 && (
                                data.map((obj) => {
                                    return (
                                        <TableRow>
                                            <TableCell style={cellStyle}>{obj.wpm}</TableCell>
                                            <TableCell style={cellStyle}>{obj.accuracy}</TableCell>
                                            <TableCell style={cellStyle}>{obj.corretChar}/{obj.inCorretChar}/{obj.extraChar}/{obj.missedChar}</TableCell>

                                            <TableCell style={cellStyle}>{obj.timeStamp.toDate().toLocaleDateString()} {obj.timeStamp.toDate().toLocaleTimeString()}</TableCell>

                                            {/* {console.log(obj.timeStamp.toDate().toLocaleString())} */}
                                        </TableRow>
                                    )
                                })
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default UserDataTable