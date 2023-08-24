import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'

const UserDataTable = ({ data }) => {
    // console.log(data);



    return (
        <div className='table' >
            <TableContainer>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableCell' >wpm</TableCell>
                            <TableCell className='tableCell'>accuracy</TableCell>
                            <TableCell className='tableCell'>character</TableCell>
                            <TableCell className='tableCell'>Date</TableCell>


                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            data.length > 0 && (
                                data.map((obj, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell className='tableCell'>{obj.wpm}</TableCell>
                                            <TableCell className='tableCell'>{obj.accuracy}</TableCell>
                                            <TableCell className='tableCell'>{obj.corretChar}/{obj.inCorretChar}/{obj.extraChar}/{obj.missedChar}</TableCell>

                                            <TableCell className='tableCell'>{obj.timeStamp.toDate().toLocaleDateString()} {obj.timeStamp.toDate().toLocaleTimeString()}</TableCell>

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