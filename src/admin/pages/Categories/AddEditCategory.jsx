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
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Colors } from '../../../styles/theme';


const AddEditCategory = (props) => {
    const { onSubmit, open, categoryModel, onClose } = props
    const isEditMode = !!categoryModel.Title;

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
                            {isEditMode ? 'Cập nhật danh mục' : ' Thêm danh mục'}
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
                        <Formik initialValues={categoryModel} onSubmit={onSubmit}>
                            {({ values, handleChange, handleBlur, }) => {
                                return (
                                    <Form>
                                        <Field
                                            fullWidth
                                            id="Title"
                                            name="Title"
                                            type="text"
                                            value={values.Title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            as={TextField}
                                            label="Danh mục"
                                        />
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


export default AddEditCategory;
