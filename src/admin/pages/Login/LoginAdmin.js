import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

const Login = () => {

  const paperRootStyle = { width: 340, margin: "20px auto" }
  const paperStyle = { padding: 20, height: '80vh', margin: "0 auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }
  const fieldStyle = { marginBottom: '20px', };
  const errorStyle = { color: 'red', };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    username: '',
    password: '',
    remember: false
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().email('Nhập đúng cú pháp Emmail').required("Không được bỏ trống"),
    password: Yup.string().required("Không được bỏ trống")
  })
  const onSubmit = (values, props) => {
    setTimeout(() => {
      props.resetForm()
      props.setSubmitting(false)
    }, 2000)

  }
  return (
    <Paper elevation={20} style={paperRootStyle}>
      <Grid  >
        <Paper style={paperStyle}>
          <Grid align='center' mb={2}>
            <Avatar style={avatarStyle}><LockIcon /></Avatar>
            <Typography variant='body' textTransform="uppercase">Đăng nhập quản trị viên</Typography>
          </Grid>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(props) => (
              <Form>
                <Field as={TextField} label='Tên đăng nhập / Email' name="username"
                  placeholder='Tên đăng nhập / Email' fullWidth required
                  style={fieldStyle}
                  helperText={<ErrorMessage name="username" component="div" style={errorStyle} />}
                />
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Mật khẩu"
                      name="password"
                      style={fieldStyle}
                      placeholder="Mật khẩu"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      required
                      helperText={<ErrorMessage name="password" component="div" style={errorStyle} />}
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
                  </Grid>
                </Grid>
                <Field as={FormControlLabel}
                  name='remember'
                  control={
                    <Checkbox
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                  style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>

              </Form>
            )}
          </Formik>
        </Paper>
      </Grid >
    </Paper >
  )
}

export default Login