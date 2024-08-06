import API from './api';

const PRODUCTS_URL = 'products';

export const deleteProduct = async (id) => await API.delete(PRODUCTS_URL, { id });

export const getProduct = async (id) => await API.get(PRODUCTS_URL, { id });

export const saveProduct = async (payload) => await API.post(PRODUCTS_URL, { payload });

export const updateProduct = async (id, payload) => await API.patch(PRODUCTS_URL, { id, payload });

export const getProductList = async (payload) => await API.get(PRODUCTS_URL, { params: payload });

export const addVariants = async (id, payload) => await API.post(PRODUCTS_URL, { id, payload });

export const updateVariant = async (id, variantId, payload) => await API.post(PRODUCTS_URL, { id, payload, variantId });

export const updateProductPrice = async (id, price) => await API.patch(PRODUCTS_URL, { id, price });
