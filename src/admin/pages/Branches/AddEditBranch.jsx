import { CloseOutlined } from '@mui/icons-material';
import {
    Backdrop,
    Box,
    Button,
    Container,
    Fade,
    Modal,
    TextField,
    Typography
} from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Colors } from '../../../styles/theme';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    Name: Yup.string().required('Không được bỏ trống'),
});

const AddEditBranch = (props) => {
    const { onSubmit, open, branchModel, onClose } = props
    const isEditMode = !!branchModel.Name;

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Container maxWidth="sm">
                <Fade in={open} position="relative">
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {
                            sm: "350px",
                            md: "500px",
                        },
                        bgcolor: Colors.white,
                        border: `3px solid ${Colors.light}`,
                        boxShadow: 24,
                        p: 4,
                        marginTop: 4
                    }}>
                        <Typography position="relative" variant="h5" mb={2} align="center" fontWeight="bold">
                            {isEditMode ? 'Cập nhật thương hiệu' : ' Thêm thương hiệu'}
                            <CloseOutlined sx={{
                                cursor: "pointer",
                                position: "absolute",
                                right: {
                                    xs: -25,
                                    sm: -10,
                                },
                                top: -20,
                                "&:hover": {
                                    borderRadius: 4,
                                    color: Colors.light,
                                    bgcolor: Colors.shaft,
                                },
                            }} onClick={() => { onClose() }} />
                        </Typography>
                        <Formik validationSchema={validationSchema} initialValues={branchModel} onSubmit={onSubmit}>
                            {({ values, handleChange, handleBlur, }) => {
                                return (
                                    <Form>
                                        <Field
                                            fullWidth
                                            id="Name"
                                            name="Name"
                                            type="text"
                                            value={values.Name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={TextField}
                                            label="Thương hiệu"
                                        />
                                        <Typography variant='body1' style={{ color: 'red' }}>
                                            <ErrorMessage name="Name" component="span" />
                                        </Typography>
                                        <Box height={14} />
                                        <Button color="primary" variant="contained" fullWidth type="submit">
                                            {isEditMode ? 'Cập nhật' : 'Thêm mới'}
                                        </Button>
                                    </Form>
                                )
                            }
                            }
                        </Formik>
                    </Box>
                </Fade>

            </Container>
        </Modal >
    );
};


export default AddEditBranch;
