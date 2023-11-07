import { TablePagination } from '@mui/material';
import { useState } from 'react';

const useTable = (props) => {
    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [searchTerm, setSearchTerm] = useState({ searchFunc: items => { return items } });

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }

    const handleRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const TblPagination = () => {
        return (
            <TablePagination
                component="div"
                page={page}
                count={props.length}
                rowsPerPageOptions={pages}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPage}
            />
        );
    }

    const stableSort = (arr, comparator) => {
        const stabilizedThis = arr.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const descendingComparator = (a, b, orderBy) => {
        if (orderBy === "cateName") {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();
            if (b < a) {
                return -1;
            }
            if (b > a) {
                return 1;
            }
        }
        else if (orderBy === "branchName") {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            if (b < a) {
                return -1;
            }
            if (b > a) {
                return 1;
            }
        }
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const listAfterPagingAndSorting = () => {
        return stableSort(searchTerm.searchFunc(props.sort()), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }


    const handleSortChange = (id) => {
        const isAsc = orderBy === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
    }



    const handleSearchBranchChange = (e) => {
        setSearchTerm({
            searchFunc: items => {
                if (e.target.value === "")
                    return items;
                else
                    return items.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))

            }
        });
    }
    const handleSearchCateChange = (e) => {
        setSearchTerm({
            searchFunc: items => {
                if (e.target.value === "")
                    return items;
                else
                    return items.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()))

            }
        });
    }
    const handleSearchProductChange = (e) => {
        setSearchTerm({
            searchFunc: items => {
                if (e.target.value === "")
                    return items;
                else
                    return items.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))

            }
        });
    }


    return {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        order,
        setOrder,
        orderBy,
        setOrderBy,
        searchTerm,
        setSearchTerm,
        handlePageChange,
        handleRowsPerPage,
        stableSort,
        getComparator,
        descendingComparator,
        listAfterPagingAndSorting,
        handleSortChange,
        handleSearchBranchChange,
        handleSearchCateChange,
        handleSearchProductChange,
        TblPagination,
    };
};

export default useTable;
