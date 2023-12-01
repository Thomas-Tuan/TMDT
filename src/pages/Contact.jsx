import { Box, Button, Container, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import Iframe from 'react-iframe'
import * as Yup from 'yup'
import { ImagesBg } from '../asset'
import MyBreadcrumb from '../components/common/MyBreadcrumb'
import useContacts from '../hooks/useContact'
import { Colors } from '../styles/theme'

const initialValues = {
    Id: 0,
    Name: '',
    Email: '',
    Phone: '',
    Title: '',
    Description: '',
};

const Contact = () => {
    const { handleSubmit } = useContacts();

    const validationSchema = Yup.object().shape({
        Name: Yup.string().required('Không được bỏ trống'),
        Title: Yup.string().required('Không được bỏ trống'),
        Description: Yup.string().required('Không được bỏ trống'),
        Phone: Yup.string().required('Không được bỏ trống').min(10, 'Số điện thoại phải 10 ký tự trở lên')
            .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa các ký tự số'),
        Email: Yup.string().email("Không đúng cú pháp email !").required('Không được bỏ trống'),

    });

    return (
        <>
            <Box sx={{
                height: "250px",
                position: 'relative',
            }} >
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${ImagesBg.contactBg})`,
                }} >
                    <Typography sx={{
                        color: Colors.white,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 1,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontSize: "30px",
                        letterSpacing: 2.25,
                        zIndex: 1,
                    }}>
                        Liên hệ
                    </Typography>
                </Box>
            </Box>
            <MyBreadcrumb />
            <Container maxWidth='lg' disableGutters>
                <Grid my={2} container spacing={1}  >
                    <Grid item xs={12} md={6} >
                        <Formik validationSchema={validationSchema}
                            initialValues={initialValues}
                            onSubmit={handleSubmit} >
                            {({ values, handleChange, handleBlur, setFieldValue }) => {
                                return (
                                    <Form>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}  >
                                                <InputLabel >Họ tên</InputLabel>
                                                <Field
                                                    fullWidth
                                                    value={values.Name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="Name"
                                                    as={TextField}
                                                />
                                                <Typography variant='body1' style={{ color: 'red' }}>
                                                    <ErrorMessage name="Name" component="span" />
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}  >
                                                <InputLabel >Email</InputLabel>
                                                <Field
                                                    fullWidth
                                                    value={values.Email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="Email"
                                                    as={TextField}
                                                />
                                                <Typography variant='body1' style={{ color: 'red' }}>
                                                    <ErrorMessage name="Email" component="span" />
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}  >
                                                <InputLabel >Số điện thoại</InputLabel>
                                                <Field
                                                    fullWidth
                                                    value={values.Phone}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="Phone"
                                                    as={TextField}
                                                />
                                                <Typography variant='body1' style={{ color: 'red' }}>
                                                    <ErrorMessage name="Phone" component="span" />
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}  >
                                                <InputLabel >Tiêu đề</InputLabel>
                                                <Field
                                                    fullWidth
                                                    value={values.Title}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="Title"
                                                    as={TextField}
                                                />
                                                <Typography variant='body1' style={{ color: 'red' }}>
                                                    <ErrorMessage name="Title" component="span" />
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12}  >
                                                <InputLabel >Nội dung</InputLabel>
                                                <Field
                                                    fullWidth
                                                    name="Description"
                                                    as={TextField}
                                                    multiline
                                                    rows={4}
                                                    value={values.Description}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <Typography variant='body1' style={{ color: 'red' }}>
                                                    <ErrorMessage name="Description" component="span" />
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={12} alignItems="center">
                                                <Button color="primary" variant="contained" fullWidth type="submit">
                                                    Gửi
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )
                            }
                            }
                        </Formik>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.460226342805!2d106.66478987340037!3d10.776019959204552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edb765b5c25%3A0x9a3519bdad5a85a3!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ2_huqFpIG5n4buvIC0gVGluIGjhu41jIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCAoSFVGTElUKQ!5e0!3m2!1svi!2s!4v1700149099194!5m2!1svi!2s"
                            width="100%"
                            height="400px"
                            display="block"
                            position="relative" />
                    </Grid>
                </Grid >
            </Container >
        </>
    )
}

export default Contact