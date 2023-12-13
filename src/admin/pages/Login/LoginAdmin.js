import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import loginApi from '../../../api/loginApi';

const AdminLogin = () => {
  const paperRootStyle = { width: 340, margin: "20px auto" }
  const paperStyle = { padding: 20, height: '80vh', margin: "0 auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    Name: '',
    Password: '',
  }
  const validationSchema = Yup.object().shape({
    Name: Yup.string().required("Không được bỏ trống"),
    Password: Yup.string().required("Không được bỏ trống")
  })
  const handleSubmit = async (values, props) => {
    try {
      const response = await loginApi.signIn(values)
      if (response.roles.every((role) => role.toLowerCase().includes("admin"))) {
        if (!response.isLock) {
          toast.success("Đăng nhập thành công", {
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
        sessionStorage.setItem('adminAccount', JSON.stringify(response));
      }
      navigate(from, { replace: true });
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
  return (
    <Paper elevation={20} style={paperRootStyle}>
      <Paper style={paperStyle}>
        <Grid align='center' mb={2}>
          <Avatar style={avatarStyle}><LockIcon /></Avatar>
          <Typography variant='body' textTransform="uppercase">Đăng nhập quản trị viên</Typography>
        </Grid>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {(props) => (
            <Form>
              <Field as={TextField} label='Tên đăng nhập' name="Name"
                placeholder='Tên đăng nhập' fullWidth required
              />
              <Typography variant='body1' style={{ color: 'red' }}>
                <ErrorMessage name="Name" component="span" />
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="Mật khẩu"
                    name="Password"
                    placeholder="Mật khẩu"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant='body1' style={{ color: 'red' }}>
                    <ErrorMessage name="Password" component="span" />
                  </Typography>
                </Grid>
              </Grid>
              <Button type='submit' color='primary' variant="contained"
                style={btnstyle} fullWidth> Đăng nhập
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Paper >
  )
}

export default AdminLogin