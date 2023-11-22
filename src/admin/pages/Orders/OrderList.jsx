import { DeleteOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, IconButton, Stack, TableContainer, TableSortLabel, Typography, colors } from '@mui/material';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { format, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useDeleteForm from '../../../hooks/useDeleteForm';
import useOrders from '../../../hooks/useOrder';
import useTable from '../../../hooks/useTable';

const headCells = [
    {
        Id: "orderId",
        Title: "STT",
        disableSorting: true,
    },
    {
        Id: "dateOrder",
        Title: "Ngày đặt",
        disableSorting: true,
    },
    {
        Id: "totalMoney",
        Title: "Tổng tiền",
    },
    {
        Id: "status",
        Title: "Trạng thái",
    },
]

export default function OrdersList() {
    const { orders, isLoading } = useOrders();
    const itemGet = useTable(orders);
    const [newValue, setNewValue] = useState({});
    const { handleClickOpen, MyDialog, } = useDeleteForm({ newValue, setNewValue });

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Paper sx={{
            overflow: "auto"
        }}>
            {MyDialog()}
            <Stack direction="row" sx={{
                pt: 2,
                margin: '16px',
                alignItems: "center",
                width: "100%",
                justifyContent: "center"
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "center",
                        borderRadius: '4px',
                        padding: '4px',
                        mx: 5,
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <InputBase
                        onChange={itemGet.handleSearchOrderChange}
                        placeholder="Tìm kiếm..."
                        sx={{ fontWeight: 'bold' }}
                    />
                    <IconButton sx={{ color: colors.common.black }} >
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Stack>
            {isLoading === true ?
                <Box
                    textAlign='center' mt={3}
                    sx={{
                        minHeight: '200px',
                    }}
                >
                    <CircularProgress sx={{
                        m: 2
                    }} />
                    <Typography>Loading data...</Typography>
                </Box>
                : <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {headCells.map((item, idx) => (
                                    <TableCell key={item.Id}
                                        sortDirection={itemGet.orderBy === item.Id ? itemGet.order : false}
                                    >
                                        {item.disableSorting ? item.Title :
                                            <TableSortLabel
                                                active={itemGet.orderBy === item.Id}
                                                direction={itemGet.orderBy === item.Id ? itemGet.order : 'asc'}
                                                onClick={() => { itemGet.handleSortChange(item.Id) }}>
                                                {item.Title}
                                            </TableSortLabel>
                                        }
                                    </TableCell>
                                ))}
                                <TableCell colSpan={2}>
                                    Chức năng
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {itemGet.listAfterPagingAndSorting().map((item, idx) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{item.id}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {format(parseISO(item.date), "dd/MM/yyyy HH:mm:ss")}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {item.total?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} <sup>Đ</sup>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {itemGet.getStatusText(item.status)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <IconButton
                                            size="large"
                                            edge="start"
                                            color="inherit"
                                            onClick={() => {
                                                const params = {
                                                    orderId: item.id,
                                                    customerId: item.customerId,
                                                    gender: item.gender,
                                                    email: item.email,
                                                    phone: item.phone,
                                                    status: item.status,
                                                    cusName: item.cusName
                                                };
                                                navigate(`${location.pathname}/edit/${item.id}`, { state: params });
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size="large"
                                            edge="start"
                                            color="inherit"
                                            onClick={() => {
                                                setNewValue({ Id: item.id });
                                                handleClickOpen();
                                            }}
                                        >
                                            <DeleteOutline />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {itemGet.TblPagination()}
                </TableContainer>
            }
        </Paper >
    );
}