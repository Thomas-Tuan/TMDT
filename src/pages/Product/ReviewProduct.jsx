import StarIcon from '@mui/icons-material/Star';
import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, Grid, InputLabel, LinearProgress, Pagination, Paper, Rating, Skeleton, Stack, TextField, Typography, linearProgressClasses } from '@mui/material';
import React, { useState } from 'react';
import { Colors } from '../../styles/theme';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useReviews from '../../hooks/useReview';
import usePaginationReviews from '../../hooks/usePaginationReviews';
import { red } from '@mui/material/colors';
import { format, parseISO } from 'date-fns';

const labels = {
    1: 'Không thích',
    2: 'Tạm được',
    3: 'Bình thường',
    4: 'Hài lòng',
    5: 'Tuyệt vời',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Không được bỏ trống'),
    Comment: Yup.string().required('Không được bỏ trống'),
});

const ReviewProduct = (props) => {
    const [page, setPage] = useState(0);
    const { productInfo } = props;
    const { handleSubmit } = useReviews();
    var currentDate = new Date();

    const { reviewsPagination, isLoading, dataFetched } = usePaginationReviews(parseInt(productInfo.id), page)
    const getAllValues = () => {
        if (!isLoading && dataFetched) {
            const getPercentageFromRating = (rating, totalCount, totalPercentage) => {
                const adjustedPercentage = (totalCount > 0) ? (rating / totalCount) * totalPercentage : 0;
                const reducedPercentage = adjustedPercentage - ((totalCount - 1) * 5);
                return Math.max(0, Math.round(reducedPercentage));
            };
            const generateRatingList = (reviews) => {
                const ratingMap = {};
                reviews.forEach(review => {
                    const { rateValue } = review;
                    ratingMap[rateValue] = (ratingMap[rateValue] || 0) + 1;
                });
                const totalReviews = reviews.length;
                const ratingList = Array.from({ length: 5 }, (_, i) => i + 1).map(value => {
                    const totalCount = ratingMap[value] || 0;
                    return {
                        value,
                        totalCount,
                        percent: getPercentageFromRating(totalCount, totalReviews, 100),
                    };
                });

                return ratingList;
            };
            const ratingList = generateRatingList(reviewsPagination.reviews);

            return (
                <>
                    {ratingList.map((item, idx) => (
                        <Stack direction="row" justifyContent="center" alignItems="center" key={idx}>
                            <Stack mr={1} direction="row" alignItems="center">
                                <Typography variant='subtitle1'>
                                    {item.value}
                                </Typography>
                                <StarIcon color='warning' />
                            </Stack>
                            <LinearProgress color="success" variant='determinate'
                                value={100}
                                sx={{
                                    width: 250,
                                    height: 10,
                                    borderRadius: 5,
                                    bgcolor: Colors.muted,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 5,
                                        bgcolor: Colors.success,
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: `${item.percent}%`,
                                    },
                                }}
                            />
                            <Typography variant='subtitle1' ml={1}>{item.totalCount}</Typography>
                        </Stack>
                    ))
                    }
                </>
            )
        }
    }
    const totalPages = Math.ceil(reviewsPagination.totalCount / 3);
    const initialValues = {
        rateValue: 5,
        productId: parseInt(productInfo.id),
        userName: '',
        Comment: '',
        Date: currentDate.toISOString(),
    };
    const handleNavigateToNextPage = (event, selectedPage) => {
        setPage(selectedPage);
    };

    const RatingField = ({ field, form, ...props }) => {
        const [hover, setHover] = useState(-1);

        return (
            <Box
                sx={{
                    justifyContent: "center",
                    width: 1,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <InputLabel sx={{ pr: 2 }}>Đánh giá</InputLabel>
                <Rating
                    name={field.name}
                    value={field.value}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        form.setFieldValue(field.name, newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55, }} fontSize="inherit" />}
                    {...props}
                />
                {field.value !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : field.value]}</Box>
                )}
            </Box>
        );
    };
    const CommentSkeleton = () => {
        if (!isLoading && dataFetched) {
            return (
                <>
                    {reviewsPagination.reviews.length > 0 ? (
                        <>
                            {reviewsPagination.reviews.map((item, idx) => (
                                <Card
                                    key={idx}
                                    variant="outlined"
                                    sx={{ width: 'max(400px, 60%)', borderRadius: 0, '--Card-radius': 0 }}
                                >
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            </Avatar>
                                        }
                                        title={item.userName}
                                        subheader={format(parseISO(item.date), "dd/MM/yyyy HH:mm:ss")}
                                    />
                                    <CardContent orientation="horizontal">
                                        <Rating name="read-only" value={item.rateValue} readOnly />
                                        <Typography mt={1} variant='subtitle1'>
                                            {item.comment}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                            <Pagination
                                sx={{
                                    mt: 2,
                                }}
                                size="large"
                                variant="outlined" shape="rounded"
                                color="warning"
                                count={totalPages}
                                page={page}
                                onChange={handleNavigateToNextPage}
                            />
                        </>
                    ) : (
                        <Typography variant="body1"> Không có đánh giá của sản phẩm hiện tại</Typography>
                    )}
                </>
            )
        }
    }

    return (
        <Grid item xs={12}>
            <Paper sx={{
                display: "flex",
                flexDirection: "column",
                width: 1,
            }}>
                <Typography p={2} letterSpacing={1} variant="h5" fontWeight={500}>
                    Đánh giá sản phẩm
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Grid container spacing={2}>
                    <Grid item xs={5}                       >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                            <Typography textTransform="uppercase" variant="subtitle1">
                                Đánh giá trung bình
                            </Typography>
                            {reviewsPagination.averageRating !== 0 &&
                                <Typography variant="h4" sx={{
                                    color: Colors.danger,
                                    fontWeight: 600
                                }}>
                                    {reviewsPagination.averageRating}/5
                                </Typography>
                            }
                            <Rating name="read-only" value={5} readOnly />
                            <Typography variant="subtitle1">
                                {reviewsPagination.totalCount} đánh giá
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={7}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                        <Stack>
                            {getAllValues()}
                        </Stack>
                    </Grid>
                    <Grid item sm={12} md={6}>
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
                                            <Typography variant='h6' fontWeight="bold" textTransform="uppercase"
                                                sx={{
                                                    textAlign: "center"
                                                }}>
                                                Phiếu đánh giá
                                            </Typography>
                                            <Form>
                                                <Stack spacing={4}>
                                                    <Stack spacing={2}>
                                                        <Stack spacing={1}>
                                                            <Field
                                                                fullWidth
                                                                label="Tên khách hàng"
                                                                value={values.userName}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                name="userName"
                                                                as={TextField}>
                                                            </Field>
                                                            <Typography variant='body1' style={{ color: 'red' }}>
                                                                <ErrorMessage name="userName" component="span" />
                                                            </Typography>
                                                        </Stack>
                                                        <Stack spacing={1}>
                                                            <Field
                                                                name="rateValue"
                                                                component={RatingField}
                                                            />
                                                        </Stack>
                                                        <Stack spacing={1}>
                                                            <Field
                                                                label="Hãy chia sẻ ý kiến của quý khách tại đây"
                                                                fullWidth
                                                                name="Comment"
                                                                as={TextField}
                                                                multiline
                                                                rows={4}
                                                                value={values.Comment}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            <Typography variant='body1' style={{ color: 'red' }}>
                                                                <ErrorMessage name="Comment" component="span" />
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <Button
                                                        type='submit'
                                                        variant='contained'
                                                        size='large'>
                                                        Gửi đơn đánh giá
                                                    </Button>
                                                </Stack>
                                            </Form>

                                        </Stack>
                                    </Stack>
                                )
                            }
                            }
                        </Formik>
                    </Grid>
                    <Grid item sm={12} md={6} >
                        <Stack>
                            {CommentSkeleton()}
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default ReviewProduct