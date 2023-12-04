import { DeleteOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { Button, CircularProgress, IconButton, Stack, TableContainer, TableSortLabel, Typography, colors } from '@mui/material';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useDeleteForm from '../../../hooks/useDeleteForm';
import useTable from '../../../hooks/useTable';
import voucherApi from '../../../api/voucherApi';
import { format, parseISO } from 'date-fns';

const headCells = [
    {
        Id: "voucherId",
        Title: "STT",
        disableSorting: true,
    },
    {
        Id: "code",
        Title: "Mã khuyến mãi",
    },
    {
        Id: "description",
        Title: "Mô tả",
        disableSorting: true,
    },
    {
        Id: "endDate",
        Title: "Ngày kết thúc",
        disableSorting: true,
    },
]

export default function VouchersList() {
    const [newValue, setNewValue] = useState({});
    const { handleClickOpen, MyDialog, } = useDeleteForm({ newValue, setNewValue });
    const location = useLocation();
    const [vouchers, setVouchers] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const itemGet = useTable(vouchers);

    useEffect(() => {
        setIsLoading(true);
        fetchProductList();
    }, [])

    const fetchProductList = async () => {
        try {
            const response = await voucherApi.getAll();
            setIsLoading(false);
            setVouchers(response);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }

    return (
        <Paper sx={{
            overflow: "auto",
        }}>
            {MyDialog()}
            <Stack direction="row" sx={{
                pt: 2,
                margin: '16px',
                alignItems: "center",
                width: "100%",
                justifyContent: "center"
            }}>
                <Button component={Link} to={`${location.pathname}/create`} variant="contained" color="primary" >
                    Thêm mã khuyến mãi
                </Button>
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
                        onChange={itemGet.handleSearchVoucherChange}
                        placeholder="Tìm kiếm..."
                        sx={{ fontWeight: 'bold' }}
                    />
                    <IconButton sx={{ mr: 3, color: colors.common.black }} >
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Stack>
            <Box sx={{ maxWidth: 'xs' }} textAlign='center' mt={3}>
                {isLoading === true ?
                    <Box
                        sx={{
                            minHeight: '200px',
                        }}
                    >
                        <CircularProgress sx={{
                            m: 2
                        }} />
                        <Typography>Loading data...</Typography>
                    </Box>
                    : <TableContainer>
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
                                        <TableCell align="left">{idx + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {item.code}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {item.description}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {format(parseISO(item.endDate), "dd/MM/yyyy HH:mm:ss")}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <IconButton
                                                size="large"
                                                edge="start"
                                                color="inherit"
                                                component={Link} to={`${location.pathname}/edit/${item.id}`}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                size="large"
                                                edge="start"
                                                color="inherit"
                                                onClick={() => {
                                                    setNewValue({ Id: item.id, Code: item.code });
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
            </Box>
        </Paper >
    );
}