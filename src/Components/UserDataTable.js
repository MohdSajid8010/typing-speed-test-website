
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material";
import { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";



const columns = [
    { label: 'S no.', align: 'left', minWidth: 70 },
    { label: 'WPM', align: 'center', minWidth: 70 },
    { label: 'Accuracy', align: 'center', minWidth: 70 },
    {
        label: 'Character',
        minWidth: 70,
        align: 'center',
    },
    {
        label: 'Date',
        minWidth: 170,
        align: 'right',
    },

];

const UserDataTable = ({ data }) => {
    const { theme } = useThemeContext()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className='table' >
            <Paper sx={{ width: '100%', background: `${theme.background}`, overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, i) => (
                                    <TableCell
                                        key={i}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        className='tableCell'
                                        sx={{ background: `${theme.background}` }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((obj, i) => {
                                    return <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                        <TableCell align={columns[0].align} className='tableCell'>{(page * rowsPerPage) + (i + 1)}</TableCell>
                                        <TableCell align={columns[1].align} className='tableCell'>{obj.wpm}</TableCell>
                                        <TableCell align={columns[2].align} className='tableCell'>{obj.accuracy}</TableCell>
                                        <TableCell align={columns[3].align} className='tableCell'>

                                            <Tooltip title="Correct / Incorrect / Missed / Extra " arrow>
                                                {obj.corretChar}/
                                                {obj.inCorretChar}/
                                                {obj.missedChar}/
                                                {obj.extraChar}
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell align={columns[4].align} className='tableCell'>{obj.timeStamp.toDate().toLocaleDateString()} {obj.timeStamp.toDate().toLocaleTimeString()}</TableCell>

                                    </TableRow>
                                })}
                        </TableBody>

                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 8]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ color: `${theme.textColor}`, fontSize: "20px" }}
                />
            </Paper>
        </div>

    );
}

export default UserDataTable