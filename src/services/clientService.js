import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

export const getClient = async (uid) => {
  const collectionRef = collection(db, 'clients');
  const docRef = doc(collectionRef, uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const saveClient = async (payload) => {
  const collectionRef = collection(db, 'clients');
  const docRef = await addDoc(collectionRef, payload);
  return docRef;
};

export const updateClient = async (payload) => {
  const collectionRef = collection(db, 'clients');
  const docRef = doc(collectionRef, payload.uid);
  await setDoc(collectionRef, payload);
  return docRef;
};

export const deleteClient = async (uid) => {
  const collectionRef = collection(db, 'clients');
  const docRef = doc(collectionRef, uid);
  await deleteDoc(collectionRef, docRef);
};
