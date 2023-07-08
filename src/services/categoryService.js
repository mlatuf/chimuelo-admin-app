import API from './api';

const CATEGORIES_URL = 'categories';

export const deleteCategory = async (id) => await API.delete(`${CATEGORIES_URL}/${id}`);

export const getCategory = async (id) => await API.get(`${CATEGORIES_URL}/${id}`);

export const saveCategory = async (payload) =>
  await API.post(CATEGORIES_URL, { name: payload.name, parent: payload.parent });

export const updateCategory = async (id, payload) => await API.patch(`${CATEGORIES_URL}/${id}`, { payload });

export const getCategoryList = async (payload) => await API.get(CATEGORIES_URL, { payload });
