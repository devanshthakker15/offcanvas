import * as Yup from 'yup';


export const basicSchema = Yup.object().shape({
categoryName: Yup.string().required('Category Name is required'),
categoryCode: Yup.string().required('Category Code is required'),
categoryDescription: Yup.string().required('Category Description is required'),
price: Yup.number().required('Price is required'),
});
