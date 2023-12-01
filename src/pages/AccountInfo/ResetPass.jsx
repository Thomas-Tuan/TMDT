import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Container, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import userApi from '../../api/userApi';

const ResetPassword = () => {

    const [initialValues, setInitialValues] = useState({
        Id: '',
        userName: '',
        Email: '',
        Password: '',
        confirmPass: '',
        Role: 'User',
        isLock: false,
    });
    const getSession = sessionStorage.getItem('userAccount')
    const accountInfo = JSON.parse(getSession);
    const navigate = useNavigate();

    const [showHiddenPass, setShowHiddenPass] = useState(false)
    const [showHiddenConfirmPass, setShowHiddenConfirmPass] = useState(false)

    const handleClickShowPassword = () => {
        setShowHiddenPass(!showHiddenPass);
    };
    const handleClickShowConfirmPassword = () => {
        setShowHiddenConfirmPass(!showHiddenConfirmPass);
    };

    useEffect(() => {
        if (accountInfo.customerId !== undefined) {
            const getUserById = async (id) => {
                try {
                    const response = await userApi.get(id);
                    const newInitialValues = {
                        Id: response.id,
                        Email: response.email,
                        userName: response.userName,
                        isLock: response.isLock,
                        Password: '',
                        confirmPass: '',
                        Role: response.role,
                    };
                    setInitialValues(newInitialValues)
                } catch (error) {
                    console.error('Lỗi không được lấy dữ liệu người dùng:', error);
                }
            }
            getUserById(accountInfo.customerId);
        }
    }, [])

    const handleSubmit = async (values) => {
        try {
            await userApi.update(values);
            toast.success("Cập nhật tài khoản thành công !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            sessionStorage.removeItem('userAccount');
            navigate('/login');
        }
        catch (err) {
            if (err.response && err.response.data !== undefined) {
                toast.error("Lỗi sửa mật khẩu", {
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
        Password: Yup.string().required('Không được bỏ trống').min(5, 'Mật khẩu phải 5 ký tự trở lên'),
        confirmPass: Yup.string().oneOf([Yup.ref('Password')], 'Mật khẩu không trùng khớp')
            .required('Không được bỏ trống'),
    })

    return (
        <Container disableGutters maxWidth="lg">
            <Formik validationSchema={validationSchema}
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={handleSubmit} >
                {() => {
                    return (
                        <Form>
                            <Grid container spacing={1}>
                                <Grid item xs={12} >
                                    <Field style={{ marginBottom: 10 }} as={TextField} InputProps={{
                                        readOnly: true,
                                    }}
                                        value={initialValues.Email}
                                        label='Email'
                                        name="Email"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <Field
                                        fullWidth
                                        label='Mật khẩu'
                                        type={showHiddenPass ? 'text' : 'password'}
                                        name="Password"
                                        as={TextField}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        size="large"
                                                    >
                                                        {showHiddenPass ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}>
                                    </Field>
                                    <Typography variant='body1' style={{ color: 'red' }}>
                                        <ErrorMessage name="Password" component="span" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} >
                                    <Field
                                        fullWidth
                                        label='Xác nhận mật khẩu'
                                        type={showHiddenConfirmPass ? 'text' : 'password'}
                                        name="confirmPass"
                                        as={TextField}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowConfirmPassword}
                                                        size="large"
                                                    >
                                                        {showHiddenConfirmPass ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    >
                                    </Field>
                                    <Typography variant='body1' style={{ color: 'red' }}>
                                        <ErrorMessage name="confirmPass" component="span" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={12} alignItems="center">
                                    <Button color="primary" variant="contained" fullWidth type="submit">
                                        Cập nhật
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }
                }
            </Formik>
        </Container>
    )
}

export default ResetPassword