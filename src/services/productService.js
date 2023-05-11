/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
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

export const getProductList = async ({ category, attributes }) => {
  const collectionRef = collection(db, 'products');
  const querySnapshot = await getDocs(collectionRef);
  let resultDocs = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    resultDocs.push({ ...docData, id: doc.id });
    if (category) {
      resultDocs = resultDocs.filter(
        (doc) => doc.category === category || (attributes && docData.attributes === attributes)
      );
    }
  });
  return resultDocs;
};
