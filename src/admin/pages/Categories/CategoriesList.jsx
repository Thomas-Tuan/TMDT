import { DeleteOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { Button, CircularProgress, IconButton, TableContainer, TableSortLabel, Toolbar, Typography, colors } from '@mui/material';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import useCategories from '../../../hooks/useCategories';
import useTable from '../../../hooks/useTable';
import AddEditCategory from './AddEditCategory';
import useDeleteForm from '../../../hooks/useDeleteForm';
const headCells = [
    {
        Id: "cateId",
        Title: "STT",
        disableSorting: true,
    },
    {
        Id: "cateName",
        Title: "Tên danh mục",
    },
]

export default function CategoriesList() {
    const { categories, isLoading, handleSubmit } = useCategories();
    const itemGet = useTable(categories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const initialValues = { Id: 0, Title: '' };
    const [newValue, setNewValue] = useState({ ...initialValues });
    const { handleClickOpen, MyDialog, } = useDeleteForm({ newValue, setNewValue });
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewValue({});
    };

    return (
        <Paper>
            {MyDialog()}
            <Toolbar sx={{
                pt: 2,
                margin: '16px',
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between"
            }}>
                <Button variant="contained" color="primary" onClick={openModal}>
                    Thêm danh mục
                </Button>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '4px',
                        padding: '4px',
                        mr: 2,
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <InputBase
                        onChange={itemGet.handleSearchCateChange}
                        placeholder="Tìm kiếm..."
                        sx={{ marginRight: 1, fontWeight: 'bold' }}
                    />
                    <IconButton sx={{ color: colors.common.black }} >
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            <AddEditCategory categoryModel={Object.keys(newValue).length === 0 ? initialValues : newValue} onSubmit={handleSubmit} open={isModalOpen} onClose={closeModal} />
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
                                        key={item.title}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{item.id}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {item.title}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <IconButton
                                                size="large"
                                                edge="start"
                                                color="inherit"
                                                onClick={() => {
                                                    setNewValue({ ...newValue, Id: item.id, Title: item.title });
                                                    openModal();
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                size="large"
                                                edge="start"
                                                color="inherit"
                                                onClick={() => {
                                                    setNewValue({ Id: item.id, Title: item.title });
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