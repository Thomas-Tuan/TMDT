import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import LockIcon from '@mui/icons-material/Lock';
import mailApi from '../../api/mailApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const initialValues = {
  Email: '',
}
const ForgotPassword = () => {
  const paperRootStyle = { width: 340, margin: "20px auto" }
  const paperStyle = { padding: 20, height: '80vh', margin: "0 auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const response = await mailApi.sendMail(values);
      localStorage.setItem('userEmail', values.Email);
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
      navigate('/confirmOTP')
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
    Email: Yup.string().email("Không đúng cú pháp email !").required('Không được bỏ trống'),
  })

  return (
    <Paper elevation={20} style={paperRootStyle}>
      <Paper style={paperStyle}>
        <Grid align='center' mb={2}>
          <Avatar style={avatarStyle}><LockIcon /></Avatar>
          <Typography variant='body' textTransform="uppercase">Sửa đổi mật khẩu</Typography>
        </Grid>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {(props) => (
            <Form>
              <Field as={TextField} label='Email' name="Email"
                placeholder='Vui lòng nhập Email đã đăng ký' fullWidth required
              />
              <Typography variant='body1' style={{ color: 'red' }}>
                <ErrorMessage name="Email" component="span" />
              </Typography>
              <Button type='submit' color='primary' variant="contained"
                style={btnstyle} fullWidth> Nhận thông báo
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Paper >
  )
}

export default ForgotPassword