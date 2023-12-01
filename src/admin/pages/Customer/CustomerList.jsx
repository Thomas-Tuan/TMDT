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
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import customerApi from '../../../api/customerApi';
import useTable from '../../../hooks/useTable';

const headCells = [
    {
        Id: "customerId",
        Title: "Id",
        disableSorting: true,
    },
    {
        Id: "Name",
        Title: "Tên khách hàng",
    },
    {
        Id: "Email",
        Title: "Email",
        disableSorting: true,
    },
    {
        Id: "Phone",
        Title: "Số điện thoại",
        disableSorting: true,
    },
]

export default function CustomerList() {
    const [customer, setCustomer] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const itemGet = useTable(customer);
    const location = useLocation();


    useEffect(() => {
        setIsLoading(true);
        fetchCustomerList();
    }, [])

    const fetchCustomerList = async () => {
        try {
            const response = await customerApi.getAllCustomer();
            setIsLoading(false);
            setCustomer(response);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }

    return (
        <Paper sx={{
            overflow: "auto",
        }}>
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
                        onChange={itemGet.handleSearchCustomerChange}
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
                                        key={item.customerId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{idx + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            <Stack direction="row" alignItems="center">
                                                <img style={{ marginRight: "16px" }} src={item.image} alt='User Img' height='60' width='60' />
                                                {item.name}
                                            </Stack>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {item.email}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {item.phone}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <IconButton
                                                size="large"
                                                edge="start"
                                                color="inherit"
                                                component={Link} to={`${location.pathname}/edit/${item.customerId}`}
                                            >
                                                <EditIcon />
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