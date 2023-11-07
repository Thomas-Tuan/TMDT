import { Chip, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef, useState } from 'react';
import useBranches from './useBranches';
import useCategories from './useCategories';
import useProducts from './useProducts';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function useDeleteForm(props) {
    const [open, setOpen] = useState(false);
    const { handleDeleteCate, checkCates } = useCategories();
    const { handleDeleteBranch, checkBranches } = useBranches();
    const { handleDeletePro } = useProducts();
    let cateFilterArr = [];
    let branchFilterArr = [];
    if (props.newValue.Id !== 0) {
        cateFilterArr = checkCates(props.newValue.Id)
        branchFilterArr = checkBranches(props.newValue.Id)
    }
    const MyDialog = () => {
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {props.newValue.Name ?
                    <>
                        <DialogTitle>{`Xóa ${props.newValue.Name} khỏi danh sách sản phẩm ?`}</DialogTitle>
                        <DialogActions >
                            <Button variant='contained' onClick={() => {
                                handleDeletePro(props.newValue.Id)
                            }}>Đồng ý
                            </Button>
                            <Button variant='contained' onClick={handleClose}>Hủy bỏ</Button>
                        </DialogActions>
                    </>
                    : props.newValue.branchName ?
                        <>
                            {
                                branchFilterArr.length !== 0 &&
                                <>
                                    <Typography variant='body1' sx={{
                                        textAlign: "center",
                                        px: 2,
                                        my: 1,
                                    }} >
                                        Danh sách sản phẩm có chứa liên kết
                                    </Typography>
                                    <Stack my={1} direction="row" spacing={1}>
                                        {branchFilterArr.map((item, idx) => (
                                            <Chip color="warning" label={item} sx={{
                                                textAlign: "center",
                                            }} key={idx}>

                                            </Chip>
                                        ))}
                                    </Stack>
                                </>
                            }
                            {branchFilterArr.length === 0 && <DialogTitle mt={1}>{`Xóa ${props.newValue.branchName} khỏi danh sách thương hiệu ?`}</DialogTitle>}

                            <DialogActions >
                                <Button disabled={branchFilterArr.length !== 0} variant='contained' onClick={() => {
                                    handleDeleteBranch(props.newValue.Id)
                                }}>Đồng ý
                                </Button>
                                <Button variant='contained' onClick={handleClose}>Hủy bỏ</Button>
                            </DialogActions>
                        </>
                        : <>
                            {
                                cateFilterArr.length !== 0 &&
                                <>
                                    <Typography variant='body1' sx={{
                                        textAlign: "center",
                                        px: 2,
                                        my: 1,
                                    }} >
                                        Danh sách sản phẩm có chứa liên kết
                                    </Typography>
                                    <Stack my={1} direction="row" spacing={1}>
                                        {cateFilterArr.map((item, idx) => {
                                            return (
                                                <Chip color="warning" label={item} sx={{
                                                    textAlign: "center",
                                                }} key={idx}>

                                                </Chip>
                                            )
                                        })}
                                    </Stack>
                                </>
                            }
                            {cateFilterArr.length === 0 && <DialogTitle mt={1}>{`Xóa ${props.newValue.Title} khỏi danh sách danh mục ?`}</DialogTitle>}
                            <DialogActions >
                                <Button disabled={cateFilterArr.length !== 0} variant='contained' onClick={() => {
                                    handleDeleteCate(props.newValue.Id)
                                }}>Đồng ý
                                </Button>
                                <Button variant='contained' onClick={handleClose}>Hủy bỏ</Button>
                            </DialogActions>
                        </>
                }
            </Dialog >
        );
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.setNewValue({});
    };

    return {
        MyDialog,
        handleClose,
        handleClickOpen,
    };
}

