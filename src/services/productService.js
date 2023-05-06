import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './config';

export const getCategories = async () => {
  const collectionRef = collection(db, 'categories');
  const querySnapshot = await getDocs(collectionRef);
  let resultDocs = [];
  querySnapshot.forEach((doc) => {
    resultDocs.push({ ...doc.data(), id: doc.id });
  });
  return resultDocs;
};

export const saveProduct = async (payload) => {
  const collectionRef = collection(db, 'products');
  const docRef = await addDoc(collectionRef, payload);
  return docRef;
};

export const getProductList = async () => {
  const collectionRef = collection(db, 'products');
  const querySnapshot = await getDocs(collectionRef);
  let resultDocs = [];
  querySnapshot.forEach((doc) => {
    resultDocs.push({ ...doc.data(), id: doc.id });
  });
  const groupedProducts = Object.values(
    resultDocs.reduce((acc, obj) => {
      if (!acc[obj.name]) {
        acc[obj.name] = {
          name: obj.name,
          category: obj.category,
          dimensions: obj.dimensions,
          variants: [],
        };
      }
      acc[obj.name].variants.push({ ...obj.attributes, price: obj.price, stock: obj.stock });
      return acc;
    }, {})
  );

  return groupedProducts;
};
