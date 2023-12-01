import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import userApi from '../../../api/userApi';
import useUsers from '../../../hooks/useUsers';



const AddEditUser = () => {
    const { id } = useParams();
    const { handleSubmit } = useUsers();
    const isEditMode = !!id;
    const [isLoading, setIsLoading] = useState(false);

    const [initialValues, setInitialValues] = useState({
        Id: '',
        userName: '',
        Email: '',
        Password: '',
        confirmPass: '',
        Role: 'User',
        isLock: false
    });
    const [showHiddenPass, setShowHiddenPass] = useState(false)
    const [showHiddenConfirmPass, setShowHiddenConfirmPass] = useState(false)

    const [role, setRole] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetchRoleList();
    }, [])

    const fetchRoleList = async () => {
        try {
            const response = await userApi.getAllRole();
            setIsLoading(false);
            setRole(response);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }

    useEffect(() => {
        if (id !== undefined) {
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
                        Role: response.role
                    };
                    setInitialValues(newInitialValues)
                } catch (error) {
                    console.error('Lỗi không được lấy dữ liệu người dùng:', error);
                }
            }
            getUserById(id);
        }
    }, [id])

    const handleClickShowPassword = () => {
        setShowHiddenPass(!showHiddenPass);
    };
    const handleClickShowConfirmPassword = () => {
        setShowHiddenConfirmPass(!showHiddenConfirmPass);
    };

    const CustomizedSelectForStatusFormik = ({ children, form, field }) => {
        const { name, value } = field;
        const { setFieldValue } = form;
        if (children) {
            return (
                <Select
                    value={value}
                    name={name}
                    fullWidth
                    onChange={(e) => {
                        setFieldValue(name, e.target.value);
                    }}
                >
                    {children}
                </Select>
            );
        }
    };

    const CustomizedSelectForRoleFormik = ({ children, form, field }) => {
        const { name, value } = field;
        const { setFieldValue } = form;

        if (children) {
            return (
                <Select
                    value={value}
                    name={name}
                    fullWidth
                    onChange={(e) => {
                        setFieldValue(name, e.target.value);
                    }}
                >
                    {children}
                </Select>
            );
        }
    };


    const validationSchema = isEditMode ? Yup.object().shape({
        userName: Yup.string().required('Không được bỏ trống'),
        Email: Yup.string().email("Không đúng cú pháp email !").required('Không được bỏ trống'),
    })
        : Yup.object().shape({
            userName: Yup.string().required('Không được bỏ trống'),
            Email: Yup.string().email("Không đúng cú pháp email !").required('Không được bỏ trống'),
            Password: Yup.string().min(5, 'Mật khẩu phải 5 ký tự trở lên').required('Không được bỏ trống'),
            confirmPass: Yup.string().oneOf([Yup.ref('Password')], 'Mật khẩu không trùng khớp').required('Không được bỏ trống')
        })

    return (
        <Container disableGutters maxWidth="lg">
            <Formik validationSchema={validationSchema}
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={handleSubmit} >
                {({ values, handleChange, handleBlur }) => {
                    return (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Field
                                        label="Tên tài khoản"
                                        fullWidth
                                        value={values.userName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="userName"
                                        as={TextField}>
                                    </Field>
                                    <Typography variant='body1' style={{ color: 'red' }}>
                                        <ErrorMessage name="userName" component="span" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Field
                                        label="Email"
                                        fullWidth
                                        value={values.Email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="Email"
                                        as={TextField}>
                                    </Field>
                                    <Typography variant='body1' style={{ color: 'red' }}>
                                        <ErrorMessage name="Email" component="span" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    {role.length !== 0 && !isLoading ?
                                        <Field
                                            label="Quyền"
                                            fullWidth
                                            name="Role"
                                            value={values.Role}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            component={CustomizedSelectForRoleFormik}
                                        >
                                            {
                                                role.map((item, idx) => (
                                                    <MenuItem key={idx} value={item}>
                                                        {item}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Field>
                                        : <Chip label="Không có danh sách quyền !" />
                                    }
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputLabel>Trạng thái </InputLabel>
                                    <Field
                                        label="Trạng thái"
                                        fullWidth
                                        name="isLock"
                                        value={values.isLock}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        multiple
                                        component={CustomizedSelectForStatusFormik}>
                                        {['Hoạt động', 'Khóa tài khoản'].map((item, idx) => (
                                            <MenuItem key={idx} value={idx === 1 ? true : false}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Field
                                        fullWidth
                                        label="Mật khẩu"
                                        type={showHiddenPass ? 'text' : 'password'}
                                        value={values.Password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
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
                                <Grid item xs={12} md={6}>
                                    <InputLabel ></InputLabel>
                                    <Field
                                        fullWidth
                                        label="Xác nhận mật khẩu"
                                        type={showHiddenConfirmPass ? 'text' : 'password'}
                                        value={values.confirmPass}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
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
                                        {isEditMode ? 'Cập nhật' : 'Thêm mới'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }
                }
            </Formik>
            <Box mt={2}>
                <Button variant="contained" color="primary" component={Link} to='/admin/user'>
                    Trở về trang danh sách người dùng
                </Button>
            </Box>
        </Container>
    );
};


export default AddEditUser;
