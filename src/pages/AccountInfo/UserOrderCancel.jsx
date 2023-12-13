import { CloseOutlined } from '@mui/icons-material';
import {
    Backdrop,
    Box,
    Button,
    Container,
    Fade,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Typography
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import orderApi from '../../api/orderApi';
import { Colors } from '../../styles/theme';

const orderStatus = [
    {
        Id: 0,
        Title: "Đang chờ duyệt",
    },
    {
        Id: -1,
        Title: "Hủy đơn hàng",
    },
]

const UserOrderCancel = (props) => {
    const { open, orderModel, onClose } = props

    const CustomizedSelectForFormik = ({ children, form, field }) => {
        const { name, value } = field;
        const { setFieldValue } = form;
        if (children) {
            return (
                <Select
                    value={value || 0}
                    name={name}
                    fullWidth
                    onChange={e => {
                        setFieldValue(name, e.target.value);
                    }}
                >
                    {children}
                </Select>
            );
        }
    };

    const handleSubmit = async (values) => {
        try {
            await orderApi.update(values);
            toast.warning('Cập nhật thành công', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
        catch {
            toast.error('Lỗi kết nối không ổn định', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Container maxWidth="sm">
                <Fade in={open} position="relative">
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {
                            sm: "350px",
                            md: "500px",
                        },
                        bgcolor: Colors.white,
                        border: `3px solid ${Colors.light}`,
                        boxShadow: 24,
                        p: 4,
                        marginTop: 4
                    }}>
                        <Typography position="relative" variant="h5" mb={2} align="center" fontWeight="bold">
                            Cập nhật trạng thái
                            <CloseOutlined sx={{
                                cursor: "pointer",
                                position: "absolute",
                                right: {
                                    xs: -25,
                                    sm: -10,
                                },
                                top: -20,
                                "&:hover": {
                                    borderRadius: 4,
                                    color: Colors.light,
                                    bgcolor: Colors.shaft,
                                },
                            }} onClick={() => { onClose() }} />
                        </Typography>
                        <Formik onSubmit={handleSubmit} initialValues={{ Id: orderModel.id, Status: orderModel.status }}  >
                            {({ values, handleChange, handleBlur, }) => {
                                return (
                                    <Form>
                                        <InputLabel>Trạng thái</InputLabel>
                                        <Field
                                            component={CustomizedSelectForFormik}
                                            fullWidth
                                            value={values.Status}
                                            name="Status"
                                            label="Trạng thái"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            {orderStatus.map((item, idx) => (
                                                item.Id === 0 ?
                                                    <MenuItem key={idx} value={item.Id} disabled>
                                                        {item.Title}
                                                    </MenuItem> :
                                                    <MenuItem key={idx} value={item.Id}>
                                                        {item.Title}
                                                    </MenuItem>
                                            ))
                                            }
                                        </Field>
                                        <Box height={14} />
                                        <Button color="primary" variant="contained" fullWidth type="submit">
                                            Sửa đơn hàng
                                        </Button>
                                    </Form>
                                )
                            }
                            }
                        </Formik>
                    </Box>
                </Fade>

            </Container>
        </Modal >
    );
};


export default UserOrderCancel;
