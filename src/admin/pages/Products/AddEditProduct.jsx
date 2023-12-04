import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    Box,
    Button,
    Chip,
    Container,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    styled
} from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 } from "uuid";
import * as Yup from 'yup';
import branchApi from '../../../api/branchApi';
import categoryApi from '../../../api/categoryApi';
import productApi from '../../../api/productApi';
import { ImagesBg } from '../../../asset';
import useProducts from '../../../hooks/useProducts';
import { storage } from '../../../library/firebase';
import './style.scss';



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

const initialValues = {
    Id: 0,
    imgMain: "",
    Image2: "",
    Image3: "",
    Name: "",
    categoryId: 0,
    branchId: 0,
    Description: "",
    Price: 0,
    Quantity: 0,
};

const AddEditProduct = () => {
    const formikRef = useRef();
    const ckEditorRef = useRef();
    const { handleSubmit } = useProducts();
    const { id } = useParams();

    const [branches, setBranches] = useState([]);
    const [categories, setCategories] = useState([]);
    const isEditMode = !!id;
    const [newImage, setNewImage] = useState('')
    const [newImage1, setNewImage1] = useState('')

    const [newImage2, setNewImage2] = useState('')

    useEffect(() => {
        fetchBranchList();
        fetchCategoryList();
    }, [])

    const fetchBranchList = async () => {
        try {
            const response = await branchApi.getAll();
            setBranches(response);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }
    const fetchCategoryList = async () => {
        try {
            const response = await categoryApi.getAll();
            setCategories(response);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }
    useEffect(() => {
        if (id !== undefined) {
            const getProductById = async (id) => {
                try {
                    const response = await productApi.get(id);
                    const updatedInitialValues = { ...initialValues };
                    updatedInitialValues.Id = response.id;
                    updatedInitialValues.Name = response.name;

                    updatedInitialValues.Description = response.description;
                    updatedInitialValues.Price = response.price;
                    updatedInitialValues.Quantity = response.quantity;
                    updatedInitialValues.imgMain = response.imgMain;

                    updatedInitialValues.Image2 = response.image2;
                    updatedInitialValues.Image3 = response.image3;
                    updatedInitialValues.categoryId = response.categoryId;
                    updatedInitialValues.branchId = response.branchId;
                    formikRef.current.setValues(updatedInitialValues);
                    if (ckEditorRef.current && ckEditorRef.current.editorInstance) {
                        ckEditorRef.current.editorInstance.setData(updatedInitialValues.Description);
                    }
                } catch (error) {
                    console.error('Lỗi không lấy được dữ liệu sản phẩm:', error);
                }
            }
            getProductById(id);
        }
    }, [id])

    const CustomizedSelectForFormik = ({ children, form, field }) => {
        const { name, value } = field;
        const { setFieldValue } = form;
        if (children) {
            return (
                <Select
                    value={value || ""}
                    name={name}
                    fullWidth
                    onChange={e => {
                        setFieldValue(name, e.target.value);
                    }}
                >
                    {children}
                </Select>
            );
        } else if (name === "categoryId") {
            return (
                <Chip label="Không có danh mục !" />
            );
        } else {
            return (
                <Chip label="Không có thương hiệu !" />
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
        Price: Yup.number().typeError('Giá phải là ký tự số').positive('Giá không được âm')
            .required('Không được bỏ trống'),
        Quantity: Yup.number().typeError('Số lượng phải là ký tự số').max(100, "Số lượng không được quá 100 !")
            .required('Không được bỏ trống'),
    });

    return (
        <Container disableGutters maxWidth="lg">
            <Formik validationSchema={validationSchema}
                initialValues={initialValues}
                innerRef={formikRef}
                onSubmit={handleSubmit} >
                {({ values, handleChange, handleBlur, setFieldValue }) => {
                    return (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} sm={12}  >
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12}>
                                            <Field
                                                label="Tên sản phẩm"
                                                fullWidth
                                                value={values.Name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="Name"
                                                as={TextField}>
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputLabel >Thương hiệu</InputLabel>
                                            <Field
                                                fullWidth
                                                name="branchId"
                                                value={values.branchId}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                component={CustomizedSelectForFormik}>
                                                {branches.length !== 0 ? branches.map((item, idx) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                )) : null}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputLabel >Danh mục</InputLabel>
                                            <Field
                                                fullWidth
                                                name="categoryId"
                                                value={values.categoryId}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                component={CustomizedSelectForFormik}>
                                                {categories.length !== 0 ? categories.map((item, idx) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.title}
                                                    </MenuItem>
                                                )) : null}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Field
                                                label="Giá tiền"
                                                fullWidth
                                                as={TextField}
                                                value={values.Price}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="Price"
                                            />
                                            <Typography variant='body1' style={{ color: 'red' }}>
                                                <ErrorMessage name="Price" component="span" />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Field
                                                fullWidth
                                                label="Số lượng"
                                                as={TextField}
                                                value={values.Quantity}
                                                onChange={handleChange} onBlur={handleBlur}
                                                name="Quantity"
                                            />
                                            <Typography variant='body1' style={{ color: 'red' }}>
                                                <ErrorMessage name="Quantity" component="span" />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <InputLabel >Mô tả</InputLabel>
                                            <CKEditor
                                                data={values.Description ? values.Description : "Thêm thông tin sản phẩm...."}
                                                ref={ckEditorRef}
                                                editor={ClassicEditor}
                                                onChange={(event, editor) => {
                                                    setFieldValue("Description", editor.getData());
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} alignItems="center">
                                            <Button color="primary" variant="contained" fullWidth type="submit">
                                                {isEditMode ? 'Cập nhật' : 'Thêm mới'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} container spacing={1}>
                                    <Grid item xs={12}  >
                                        <InputLabel >Hình đại diện</InputLabel>
                                        <Field
                                            fullWidth
                                            name="imgMain"
                                            value={values.imgMain}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            component={InputFileUpload}
                                            newImage={newImage}
                                            setNewImage={setNewImage}
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <InputLabel >Hình 1</InputLabel>
                                        <Field
                                            fullWidth
                                            name="Image2"
                                            value={values.Image2}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            newImage={newImage1}
                                            setNewImage={setNewImage1}
                                            component={InputFileUpload}
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <InputLabel >Hình 2</InputLabel>
                                        <Field
                                            fullWidth
                                            name="Image3"
                                            value={values.Image3}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            newImage={newImage2}
                                            setNewImage={setNewImage2}
                                            component={InputFileUpload}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }
                }
            </Formik>
            <Box mt={2}>
                <Button variant="contained" color="primary" component={Link} to='/admin/product'>
                    Trở về trang danh sách sẩn phẩm
                </Button>
            </Box>
        </Container>
    );
};


export default AddEditProduct;
