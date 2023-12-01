import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    Box,
    Button,
    Container,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
    styled
} from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { v4 } from "uuid";
import * as Yup from 'yup';
import customerApi from '../../api/customerApi';
import { ImagesBg } from '../../asset';
import useCustomers from '../../hooks/useCustomer';
import { storage } from '../../library/firebase';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const AccountPage = () => {
    const { handleSubmit } = useCustomers();
    const [newImage, setNewImage] = useState('')
    const getSession = sessionStorage.getItem('userAccount')
    const accountInfo = JSON.parse(getSession);

    const [initialValues, setInitialValues] = useState({
        customerId: '',
        Image: '',
        Name: '',
        Email: '',
        Phone: '',
        Gender: 0,
    });

    useEffect(() => {
        if (accountInfo.customerId !== undefined) {
            const getCustomerById = async (id) => {
                try {
                    const response = await customerApi.get(accountInfo.customerId);
                    const newInitialValues = {
                        customerId: response.customerId,
                        Email: response.email,
                        Name: response.name,
                        Phone: response.phone ? response.phone : "",
                        Image: response.image,
                        Gender: response.gender,
                        isUser: true,
                    };
                    setInitialValues(newInitialValues)
                } catch (error) {
                    console.error('Lỗi không được lấy dữ liệu sản phẩm:', error);
                }
            }
            getCustomerById(accountInfo.customerId);
        }
    }, [accountInfo.customerId])

    const CustomizedSelectForGenderFormik = ({ children, form, field }) => {
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

    const InputFileUpload = ({ newImage, setNewImage, form, field }) => {
        const { name, value } = field;
        const { setFieldValue } = form;
        const handleFileChange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            if (file) {
                if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
                    reader.onload = (event) => {
                        setNewImage(event.target.result);
                    };
                    reader.readAsDataURL(file);
                    const uniqueFileName = `images/${v4()}_${file.name}`;
                    const imageRef = ref(storage, uniqueFileName);
                    uploadBytes(imageRef, file)
                        .then(() => {
                            return getDownloadURL(imageRef);
                        })
                        .then((url) => {
                            setFieldValue(name, url)
                        })
                        .catch((error) => {
                            console.log(`Lỗi ${error}`)
                            alert('Không được ghi đè lên file hình ảnh ban đầu !');
                        })
                } else {
                    alert('Chỉ cho phép các tệp có định dạng .jpg, .jpeg hoặc .png');
                }
            }
        };
        return (
            <Box textAlign="center">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        {value ? (
                            <img value={value} className='productImg' src={value} alt='Existing' />
                        ) : (
                            <img className='productImg' src={ImagesBg.defaultBg} alt='Default' />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button sx={{
                            margin: "0 auto"
                        }}
                            component="label"
                            variant="contained" startIcon={<CloudUploadIcon />}>
                            Chọn hình
                            <VisuallyHiddenInput type="file" accept=".jpg, .jpeg, .png"
                                onChange={handleFileChange} />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    const validationSchema = Yup.object().shape({
        Name: Yup.string().required('Không được bỏ trống'),
        Email: Yup.string().email("Không đúng cú pháp email !").required('Không được bỏ trống'),
        Phone: Yup.string().required('Không được bỏ trống')
            .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa các ký tự số')
            .min(10, 'Số điện thoại phải 10 ký tự trở lên'),
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
                                <Grid item xs={12} md={6} sm={12} container spacing={1} >
                                    <Grid item xs={12}  >
                                        <Field
                                            label="Hình đại diện"
                                            fullWidth
                                            name="Image"
                                            value={values.Image}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            component={InputFileUpload}
                                            newImage={newImage}
                                            setNewImage={setNewImage}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6} sm={12}  >
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} >
                                            <Field
                                                label="Tên khách hàng"
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
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Field
                                                label="Giới tính"
                                                fullWidth
                                                name="Gender"
                                                value={values.Gender}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                component={CustomizedSelectForGenderFormik}
                                            >
                                                {
                                                    ['Anh', 'Chị'].map((item, idx) => (
                                                        <MenuItem key={idx} value={idx}>
                                                            {item}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} >
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
                                        <Grid item xs={12} >
                                            <Field
                                                label="Số điện thoại"
                                                fullWidth
                                                value={values.Phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="Phone"
                                                as={TextField}>
                                            </Field>
                                            <Typography variant='body1' style={{ color: 'red' }}>
                                                <ErrorMessage name="Phone" component="span" />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} alignItems="center">
                                            <Button color="primary" variant="contained" fullWidth type="submit">
                                                Cập nhật
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }
                }
            </Formik>
        </Container>
    );
};


export default AccountPage;
