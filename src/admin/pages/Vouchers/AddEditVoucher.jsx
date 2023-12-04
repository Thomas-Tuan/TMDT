import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import voucherApi from '../../../api/voucherApi';
import useVoucher from '../../../hooks/useVoucher';

const AddEditVoucher = () => {
    const { handleSubmit } = useVoucher();
    const { id } = useParams();
    const isEditMode = !!id;
    const formikRef = useRef();

    const initialValues = {
        Id: 0,
        Code: '',
        Description: '',
        amountDiscount: 0,
        percentageDiscount: 0,
        endDate: '',
        discountType: 1,
    };
    const CustomizedDatePicker = ({ field, form }) => {
        const { name, value } = field;
        const dateValue = value ? new Date(value) : null;
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker label="Ngày hết hạn"
                    value={dateValue}
                    onChange={(newValues) => {
                        form.setFieldValue(name, newValues ? newValues.toISOString() : null);
                    }}
                    slotProps={{ textField: { fullWidth: true } }}
                />
            </LocalizationProvider>
        );
    };

    useEffect(() => {
        if (id !== undefined) {
            const getVoucherById = async (id) => {
                try {
                    const response = await voucherApi.get(id);
                    const newInitialValues = {
                        Id: response.id,
                        Code: response.code,
                        Description: response.description,
                        amountDiscount: response.amountDiscount,
                        percentageDiscount: response.percentageDiscount,
                        endDate: response.endDate,
                        discountType: response.discountType,
                    };
                    formikRef.current.setValues(newInitialValues);
                } catch (error) {
                    console.error('Lỗi không lấy được dữ liệu mã khuyến mãi:', error);
                }
            }
            getVoucherById(id);
        }
    }, [id])

    const validationSchema = Yup.object().shape({
        Code: Yup.string().required('Không được bỏ trống'),
        Description: Yup.string().required('Không được bỏ trống'),
        amountDiscount: Yup.number().typeError('Phải là ký tự số'),
        percentageDiscount: Yup.number().typeError('Phải là ký tự số'),
        endDate: Yup.date().min(new Date(), 'Vui lòng chọn ngày hợp lệ')
    });

    return (
        <Container disableGutters maxWidth="lg">
            <Formik validationSchema={validationSchema}
                initialValues={initialValues}
                innerRef={formikRef}
                onSubmit={handleSubmit} >
                {({ values, handleChange, handleBlur }) => {
                    return (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Field
                                        label="Mã khuyến mãi"
                                        fullWidth
                                        value={values.Code}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="Code"
                                        as={TextField}>
                                    </Field>
                                    <Typography variant='body1' style={{ color: 'red' }}>
                                        <ErrorMessage name="Code" component="span" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Field
                                        label="Mô tả"
                                        fullWidth
                                        value={values.Description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="Description"
                                        as={TextField}>
                                    </Field>
                                    <Typography variant='body1' style={{ color: 'red' }}>
                                        <ErrorMessage name="Description" component="span" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Field
                                        label="Ngày hết hạn"
                                        fullWidth
                                        value={values.endDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="endDate"
                                        component={CustomizedDatePicker}
                                    >
                                    </Field>
                                    <Typography variant='body1' style={{ color: 'red' }}>
                                        <ErrorMessage name="endDate" component="span" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Field
                                        label="Số tiền giảm"
                                        fullWidth
                                        as={TextField}
                                        value={values.amountDiscount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="amountDiscount"
                                        disabled={values.percentageDiscount !== 0 && values.percentageDiscount !== ''}
                                    />
                                    <Typography variant='body1' style={{ color: 'red' }}>
                                        <ErrorMessage name="amountDiscount" component="span" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Field
                                        fullWidth
                                        label="Giảm theo %"
                                        as={TextField}
                                        value={values.percentageDiscount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="percentageDiscount"
                                        disabled={values.amountDiscount !== 0 && values.amountDiscount !== ''}
                                    />
                                    <Typography variant='body1' style={{ color: 'red' }}>
                                        <ErrorMessage name="percentageDiscount" component="span" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} alignItems="center">
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
                <Button variant="contained" color="primary" component={Link} to='/admin/voucher'>
                    Trở về trang danh sách khuyến mãi
                </Button>
            </Box>
        </Container>
    );
};


export default AddEditVoucher;
