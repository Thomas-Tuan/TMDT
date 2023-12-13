import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import loginApi from '../../api/loginApi';
import { ScreenMode } from '../../pages/LoginPage';
import LoginRegisterOpt from './LoginRegisterOpt';

const initialValues = {
  Email: '',
  Name: '',
  Phone: '',
  cusName: '',
  Password: '',
  confirmPass: '',
  Role: 'User'
};

const validationSchema = Yup.object().shape({
  Email: Yup.string().email("Không đúng cú pháp email !").required('Không được bỏ trống'),
  Name: Yup.string().required('Không được bỏ trống'),
  cusName: Yup.string().required('Không được bỏ trống'),
  Phone: Yup.string().required('Không được bỏ trống')
    .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa các ký tự số')
    .min(10, 'Số điện thoại phải 10 ký tự trở lên'),
  Password: Yup.string().required('Không được bỏ trống').min(5, 'Mật khẩu phải 5 ký tự trở lên'),
  confirmPass: Yup.string().oneOf([Yup.ref('Password')], 'Mật khẩu không trùng khớp')
    .required('Không được bỏ trống'),
});

const SignUpForm = ({ onSwitchMode }) => {
  const [showHiddenPass, setShowHiddenPass] = useState(false)
  const [showHiddenConfirmPass, setShowHiddenConfirmPass] = useState(false)

  const handleClickShowPassword = () => {
    setShowHiddenPass(!showHiddenPass);
  };
  const handleClickShowConfirmPassword = () => {
    setShowHiddenConfirmPass(!showHiddenConfirmPass);
  };

  const handleSubmit = async (values, props) => {
    try {
      await loginApi.userRegister(values)
      toast.success('Tạo tài khoản thành công', {
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
    <Formik validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur }) => {
        return (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "100%",
            }}
          >
            <Stack spacing={2} sx={{
              width: "100%",
              maxWidth: "500px"
            }}>
              <Typography variant='h4' fontWeight="bold" textTransform="uppercase"
                sx={{
                  textAlign: "center"
                }}>
                Đăng Ký
              </Typography>
              <Form>
                <Stack spacing={4}>
                  <Stack spacing={2}>
                    <Stack spacing={1}>
                      <Field
                        fullWidth
                        label="Tên tài khoản"
                        value={values.Name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="Name"
                        as={TextField}>
                      </Field>
                      <Typography variant='body1' style={{ color: 'red' }}>
                        <ErrorMessage name="Name" component="span" />
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Field
                        fullWidth
                        label="Tên khách hàng"
                        value={values.cusName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="cusName"
                        as={TextField}>
                      </Field>
                      <Typography variant='body1' style={{ color: 'red' }}>
                        <ErrorMessage name="cusName" component="span" />
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Field
                        fullWidth
                        label="Số điện thoại"
                        value={values.Phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="Phone"
                        as={TextField}>
                      </Field>
                      <Typography variant='body1' style={{ color: 'red' }}>
                        <ErrorMessage name="Phone" component="span" />
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Field
                        fullWidth
                        label="Email"
                        value={values.Email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="Email"
                        as={TextField}>
                      </Field>
                      <Typography variant='body1' style={{ color: 'red' }}>
                        <ErrorMessage name="Email" component="span" />
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
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
                    </Stack>
                    <Stack spacing={1}>
                      <Field
                        label="Xác nhận mật khẩu"
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
                    </Stack>
                  </Stack>
                  <Button
                    type='submit'
                    variant='contained'
                    size='large'>
                    Đăng ký ngay
                  </Button>
                </Stack>
              </Form>

              <Stack direction="row" spacing={2} alignItems="center">
                <Typography>Đã có tài khoản?</Typography>
                <Button
                  onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
                  variant='contained'
                  sx={{
                    fontWeight: "bold",
                    textTransform: 'uppercase',
                    cursor: "pointer",
                    userSelect: "none"
                  }}
                >
                  đăng nhập ngay
                </Button>
              </Stack>
            </Stack>
            <LoginRegisterOpt />
          </Stack>
        )
      }
      }
    </Formik>
  );
};

export default SignUpForm;