import { ChevronRight } from '@mui/icons-material';
import { Box, Button, Container, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Stack, TableContainer, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { clearCart } from '../Redux/Cart/CartSlice';
import orderApi from '../api/orderApi';
import paymentApi from '../api/paymentApi';
import voucherApi from '../api/voucherApi';
import { Colors } from '../styles/theme';

const initialValues = {
  cusName: "",
  Gender: 0,
  Email: "",
  Phone: "",
};

const CheckoutPage = () => {
  const [couponCode, setCouponCode] = useState('');
  const cartList = useSelector(state => state.carts);
  const [isUsed, setIsUsed] = useState(false);
  const [newTotalAmount, setNewTotalAmount] = useState(0);

  const dispatch = useDispatch();
  const getSession = sessionStorage.getItem('userAccount');
  const newAccountObject = JSON.parse(getSession);
  const navigate = useNavigate();

  const handleClear = () => {
    dispatch(clearCart());
  }

  const handleApplyCode = async (values) => {
    try {
      if (
        values.Code.trim() === ""
      ) {
        alert("Mã khuyến mãi không được bỏ trống !!");
        return;
      }
      const response = await voucherApi.apply(values);
      setIsUsed(response.isUsed);
      setNewTotalAmount(response.priceAmount);
      toast.success("Áp dụng thành công", {
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
  };

  const handlePaymentWithPaypal = async (values) => {
    if (
      values.Info.cusName.trim() === "" ||
      values.Info.Phone.trim() === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin !!");
      return;
    }
    var currentDate = new Date();
    const newOrder =
    {
      ...values.Info,
      Status: 0,
      customerId: newAccountObject ? newAccountObject.customerId : null,
      Total: newTotalAmount === 0 ? cartList.cartTotalAmount : newTotalAmount,
      Date: currentDate.toISOString(),
      Products: cartList.cartItems,
      voucherCode: couponCode === '' ? null : couponCode
    }
    try {
      const orderResult = await orderApi.create(newOrder);
      handleClear();
      const params = { Amount: values.Amount, orderId: orderResult.id }
      const response = await paymentApi.createPaymentWithPaypal(params);
      window.location.href = response;
    }
    catch (err) {
      console.log(`Lỗi đặt hàng :${err}`)
    }
  }

  const handlePaymentWithVnPay = async (values) => {
    if (
      values.Info.cusName.trim() === "" ||
      values.Info.Phone.trim() === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin !!");
      return;
    }
    var currentDate = new Date();
    const newOrder =
    {
      ...values.Info,
      Status: 0,
      customerId: newAccountObject ? newAccountObject.customerId : null,
      Total: newTotalAmount === 0 ? cartList.cartTotalAmount : newTotalAmount,
      Date: currentDate.toISOString(),
      Products: cartList.cartItems,
      voucherCode: couponCode === '' ? null : couponCode
    }
    try {
      const orderResult = await orderApi.create(newOrder);
      handleClear();
      const params = { Amount: values.Amount, orderId: orderResult.id }
      const response = await paymentApi.createPaymentWithVnPay(params);
      window.location.href = response;
    }
    catch (err) {
      console.log(`Lỗi đặt hàng :${err}`)
    }
  }

  const validationSchema = Yup.object().shape({
    cusName: Yup.string().required('Không được bỏ trống'),
    Phone: Yup.string().required('Không được bỏ trống')
      .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa các ký tự số')
      .min(10, 'Số điện thoại phải 10 ký tự trở lên'),
    Email: Yup.string().email("Không đúng cú pháp email !"),
    Gender: Yup.number(),
  });

  const handleSubmit = async (values) => {
    var currentDate = new Date();
    const newOrder =
    {
      ...values,
      Status: 0,
      customerId: newAccountObject ? newAccountObject.customerId : null,
      Total: newTotalAmount === 0 ? cartList.cartTotalAmount : newTotalAmount,
      Date: currentDate.toISOString(),
      Products: cartList.cartItems,
      voucherCode: couponCode === '' ? null : couponCode
    }
    try {
      const orderResult = await orderApi.create(newOrder);
      toast.success('Đặt hàng thành công', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      handleClear();
      const params = { orderId: orderResult.id };

      navigate('/success', { state: params });
    }
    catch (err) {
      console.log(`Lỗi đặt hàng :${err}`)
    }
  }

  return (
    <Container maxWidth="lg" disableGutters>
      <Typography my={2} textTransform="uppercase" textAlign="center" variant="h3" >
        Giỏ hàng của bạn
      </Typography>
      {
        cartList.cartItems.length === 0 ?
          (
            <>
              <Typography my={2} textTransform="uppercase" textAlign="center" variant="body1" >
                Không có sản phẩm nào trong giỏ hàng !!
              </Typography>
              <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                my: 2,
              }}>
                <Button component={Link} to="/product" sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: `${Colors.shaft}`,
                  width: 130,
                }} variant='subtitle1'>
                  Mua ngay
                  <ChevronRight />
                </Button>
              </Box>
            </>
          ) :
          (
            <>
              <Stack alignItems="center" justifyContent="center" >
                <Typography my={2} textTransform="uppercase" textAlign="center" variant="body1" >
                  Hiện đang có {cartList.cartItems.length} sản phẩm
                </Typography>
              </Stack>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      borderBottom: `2px solid ${Colors.shaft}`,
                    }}>
                      <TableCell component="th" scope="row">
                        Sản phẩm
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Số lượng
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Giá tiền
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Tổng tiền
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartList.cartItems.map((item, idx) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          borderBottom: `2px solid ${Colors.shaft}`,
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center">
                            <img style={{ marginRight: "16px" }} src={item.imgMain} alt='Product Img' height='60' width='60' />
                            {item.name}
                          </Stack>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Typography sx={{
                            padding: "0.7rem 0"
                          }} variant="body1"> {item.cartQuantity}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} <sup>Đ</sup>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {(item.price * item.cartQuantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} <sup>Đ</sup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack my={2} alignItems="end" >
                <Stack alignItems="center" direction="row" justifyContent="space-between">
                  <Typography variant='body1' fontWeight={400}>
                    Tổng cộng:
                  </Typography>
                  {newTotalAmount !== 0 ?
                    <Typography variant='body1' fontWeight="bolder">
                      {newTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} <sup>Đ</sup>
                    </Typography>
                    :
                    <Typography variant='body1' fontWeight="bolder">
                      {cartList.cartTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} <sup>Đ</sup>
                    </Typography>
                  }
                </Stack>
              </Stack>
              <Paper elevation={3} sx={{
                my: 2,
              }}  >
                <Typography mb={2} textAlign="center" variant='h5'>
                  Thông tin đặt hàng
                </Typography>
                <Typography variant='body1'>
                  Thông tin người đặt
                </Typography>
                <Formik validationSchema={validationSchema}
                  initialValues={initialValues}
                  onSubmit={handleSubmit} >
                  {({ values, handleChange, handleBlur }) => {
                    return (
                      <Form>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <FormControl>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="Gender"
                                value={values.Gender}
                                onChange={handleChange}
                              >
                                <Stack direction="row" justifyContent="flex-start" alignItems="center">
                                  {
                                    ['Anh', "Chị"].map((item, idx) => (
                                      <FormControlLabel key={idx} value={idx} control={<Radio />} label={item} />
                                    ))
                                  }
                                </Stack>
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}  >
                            <Field
                              label="Tên khách hàng"
                              fullWidth
                              value={values.Name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="cusName"
                              as={TextField}>
                            </Field>
                            <Typography variant='body1' style={{ color: 'red' }}>
                              <ErrorMessage name="cusName" component="span" />
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}  >
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
                          <Grid item xs={12} md={12}  >
                            <Stack justifyContent="center" alignItems="center">
                              <Field
                                fullWidth
                                label="Email(Không bắt buộc)"
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
                          </Grid>
                          <Grid item xs={12} md={12}  >
                            <Stack direction="row" justifyContent="center" alignItems="center">
                              <Field
                                fullWidth
                                label="Mã khuyến mãi"
                                onChange={(e) => {
                                  setCouponCode(e.target.value);
                                }}
                                name="CouponCode"
                                disabled={isUsed}
                                as={TextField}>
                              </Field>
                              <Button sx={{
                                mx: 2,
                                width: 150,
                                height: 40,
                                borderRadius: 3,
                                letterSpacing: "1.15px",
                                border: `0.5px solid ${Colors.shaft}`,
                                color: `${Colors.dark_gray}`,
                                background: "none",
                                outline: "none",
                                cursor: "pointer",
                              }}
                                onClick={() => handleApplyCode({ Code: couponCode, PriceAmount: cartList.cartTotalAmount })}
                              >
                                Áp dụng
                              </Button>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={12} alignItems="center">
                            <Stack justifyContent="center" alignItems="center">
                              <Typography my={1} variant='body1'>
                                Phương thức thanh toán
                              </Typography>
                              <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
                                <Button sx={{
                                  mr: 2,
                                  width: 1,
                                  height: 40,
                                  borderRadius: 3,
                                  letterSpacing: "1.15px",
                                  border: `0.5px solid ${Colors.shaft}`,
                                  color: `${Colors.dark_gray}`,
                                  background: "none",
                                  outline: "none",
                                  cursor: "pointer",
                                }}
                                  onClick={() => handlePaymentWithPaypal({ Info: values, Amount: cartList.cartTotalAmount })}
                                >
                                  Paypal
                                </Button>
                                <Button sx={{
                                  width: 1,
                                  height: 40,
                                  borderRadius: 3,
                                  letterSpacing: "1.15px",
                                  border: `0.5px solid ${Colors.shaft}`,
                                  color: `${Colors.dark_gray}`,
                                  background: "none",
                                  outline: "none",
                                  cursor: "pointer",
                                }}
                                  onClick={() => handlePaymentWithVnPay({ Info: values, Amount: cartList.cartTotalAmount })} >
                                  VNPAY
                                </Button>
                              </Stack>
                            </Stack>
                          </Grid>
                        </Grid>
                        <Typography my={1} variant='body1' textAlign="center">
                          hoặc
                        </Typography>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                          Tiến hành đặt hàng
                        </Button>
                      </Form>
                    )
                  }
                  }
                </Formik>
              </Paper>
            </>
          )
      }
    </Container>
  )
}

export default CheckoutPage