import { collection, getDocs } from 'firebase/firestore';
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
