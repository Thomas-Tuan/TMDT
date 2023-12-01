import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import mailApi from '../../api/mailApi';

const ConfirmOtp = () => {
    const paperRootStyle = { width: 340, margin: "20px auto" }
    const paperStyle = { padding: 20, height: '80vh', margin: "0 auto" }
    const btnstyle = { margin: '8px 0' }
    const avatarStyle = { backgroundColor: '#1bbd7e' }

    const initialValues = {
        Otp: '',
        Email: localStorage.getItem('userEmail'),
    };

    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            const response = await mailApi.confirmOtp(values);
            toast.success(response.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/confirmPass')
        }
        catch (err) {
            if (err.response && err.response.data !== undefined) {
                toast.error(err.response.data.errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log(`Error to login with ${err.response.data.errorMessage}`);
            }
        }

    }

    const validationSchema = Yup.object().shape({
        Otp: Yup.string().required('Không được bỏ trống'),
    })

    return (
        <Paper elevation={20} style={paperRootStyle}>
            <Paper style={paperStyle}>
                <Grid align='center' mb={2}>
                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                    <Typography variant='body' textTransform="uppercase">Sửa đổi mật khẩu</Typography>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {() => {
                        return (
                            <Form>
                                <Field style={{ marginBottom: 10 }} as={TextField} InputProps={{
                                    readOnly: true,
                                }}
                                    value={initialValues.Email}
                                    label='Email'
                                    name="Email"
                                    fullWidth
                                />
                                <Field as={TextField} label='Otp' name="Otp"
                                    placeholder='Vui lòng nhập mã OTP' fullWidth required
                                />
                                <Typography variant='body1' style={{ color: 'red' }}>
                                    <ErrorMessage name="Otp" component="span" />
                                </Typography>
                                <Button type='submit' color='primary' variant="contained"
                                    style={btnstyle} fullWidth> Xác nhận
                                </Button>
                            </Form>
                        )
                    }}
                </Formik>
            </Paper>
        </Paper >
    )
}

export default ConfirmOtp