import {
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
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import useUsers from '../../../hooks/useUsers';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import userApi from '../../../api/userApi';



const AddEditUser = () => {
    const { role } = useUsers();
    const { id } = useParams();
    const { handleSubmit } = useUsers();
    const isEditMode = !!id;

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
                    console.error('Lỗi không được lấy dữ liệu sản phẩm:', error);
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


    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('Không được bỏ trống'),
        Email: Yup.string().email("Không đúng cú pháp email !").required('Không được bỏ trống'),
        Password: Yup.string().min(5, 'Mật khẩu phải 5 ký tự trở lên'),
        confirmPass: Yup.string().oneOf([Yup.ref('Password')], 'Mật khẩu không trùng khớp')
    });

    return (
        <Formik validationSchema={validationSchema}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={handleSubmit} >
            {({ values, handleChange, handleBlur }) => {
                return (
                    <Container disableGutters maxWidth="lg">
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <InputLabel >Tên tài khoản</InputLabel>
                                    <Field
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
                                    <InputLabel>Email</InputLabel>
                                    <Field
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
                                    <InputLabel>Quyền</InputLabel>
                                    {role.length !== 0 ?
                                        <Field
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
                                    <InputLabel >Mật khẩu</InputLabel>
                                    <Field
                                        fullWidth
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
                                    <InputLabel >Xác nhận mật khẩu</InputLabel>
                                    <Field
                                        fullWidth
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
                    </Container>

                )
            }
            }
        </Formik>
    );
};


export default AddEditUser;
