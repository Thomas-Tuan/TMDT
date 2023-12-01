import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Button, Grid, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import mailApi from '../../api/mailApi';

const ChangePassword = () => {
  const paperRootStyle = { width: 340, margin: "20px auto" }
  const paperStyle = { padding: 20, height: '80vh', margin: "0 auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }
  const navigate = useNavigate();

  const initialValues = {
    Otp: '',
    Email: localStorage.getItem('userEmail'),
    Password: '',
    confirmPass: '',
  }

  const [showHiddenPass, setShowHiddenPass] = useState(false)
  const [showHiddenConfirmPass, setShowHiddenConfirmPass] = useState(false)

  const handleClickShowPassword = () => {
    setShowHiddenPass(!showHiddenPass);
  };
  const handleClickShowConfirmPassword = () => {
    setShowHiddenConfirmPass(!showHiddenConfirmPass);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await mailApi.resetPassword(values);
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
      localStorage.removeItem('userEmail');
      navigate('/login')
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
    Password: Yup.string().required('Không được bỏ trống').min(5, 'Mật khẩu phải 5 ký tự trở lên'),
    confirmPass: Yup.string().oneOf([Yup.ref('Password')], 'Mật khẩu không trùng khớp')
      .required('Không được bỏ trống'),
  })

  return (
    <Paper elevation={20} style={paperRootStyle}>
      <Paper style={paperStyle}>
        <Grid align='center' mb={2}>
          <Avatar style={avatarStyle}><LockIcon /></Avatar>
          <Typography variant='body' textTransform="uppercase">Sửa đổi mật khẩu</Typography>
        </Grid>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {() => (
            <Form>
              <Field style={{ marginBottom: 10 }} as={TextField} InputProps={{
                readOnly: true,
              }}
                value={initialValues.Email}
                label='Email'
                name="Email"
                fullWidth
              />
              <Stack spacing={1}>
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
              </Stack>
              <Stack spacing={1}>
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
              </Stack>
              <Button type='submit' color='primary' variant="contained"
                style={btnstyle} fullWidth> Xác nhận
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Paper >
  )
}

export default ChangePassword