import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import loginApi from '../../api/loginApi';
import { ScreenMode } from '../../pages/LoginPage';

const initialValues = {
  Name: '',
  Password: '',
};

const validationSchema = Yup.object().shape({
  Password: Yup.string().required('Không được bỏ trống'),
  Name: Yup.string().required('Không được bỏ trống'),
});

const SignInForm = ({ onSwitchMode }) => {
  const [showHiddenPass, setShowHiddenPass] = useState(true)
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (values, props) => {
    try {
      const response = await loginApi.signIn(values)
      sessionStorage.setItem('userAccount', JSON.stringify(response));
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

  const handleClickShowPassword = () => {
    setShowHiddenPass(!showHiddenPass);
  };


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
                Đăng nhập
              </Typography>
              <Form>
                <Stack spacing={4}>
                  <Stack spacing={2}>
                    <Stack spacing={1}>
                      <InputLabel >Tên tài khoản</InputLabel>
                      <Field
                        fullWidth
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
                      <InputLabel >Mật khẩu</InputLabel>
                      <Field
                        fullWidth
                        type={showHiddenPass ? "password" : "text"}
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
                  </Stack>
                  <Button
                    type='submit'
                    variant='contained'
                    size='large'>
                    Đăng nhập
                  </Button>
                </Stack>
              </Form>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography>Không có tài khoản?</Typography>
                <Button
                  onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
                  variant='contained'
                  sx={{
                    fontWeight: "bold",
                    textTransform: 'uppercase',
                    cursor: "pointer",
                    userSelect: "none"
                  }}
                >
                  đăng ký ngay
                </Button>
              </Stack>
            </Stack>
          </Stack>
        )
      }
      }
    </Formik>
  );
};

export default SignInForm;