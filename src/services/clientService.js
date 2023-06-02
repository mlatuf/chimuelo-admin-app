/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-debugger */
import { AvatarGenerator } from 'random-avatar-generator';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from './config';
import API from './api';

const avatarGenerator = new AvatarGenerator();
const CLIENTS_URL = 'clients';

export const getClient = async (uid) => {
  const collectionRef = collection(db, 'clients');
  const docRef = doc(collectionRef, uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

// export const saveClient = async (payload) => {
//   const collectionRef = collection(db, 'clients');
//   const docRef = await addDoc(collectionRef, payload);
//   return docRef;
// };

export const updateClient = async (payload) => {
  const collectionRef = collection(db, 'clients');
  const docRef = doc(collectionRef, payload.uid);
  await setDoc(collectionRef, payload);
  return docRef;
};

export const deleteClient = async (uid) => {
  const collectionRef = collection(db, 'clients');
  const docRef = doc(collectionRef, uid);
  await deleteDoc(docRef);
  return docRef;
};

// export const getClientList = async () => {
//   const collectionRef = collection(db, 'clients');
//   const querySnapshot = await getDocs(collectionRef);
//   let resultDocs = [];
//   querySnapshot.forEach((doc) => {
//     resultDocs.push({ ...doc.data(), id: doc.id, avatarUrl: avatarGenerator.generateRandomAvatar() });
//   });
//   return resultDocs;
// };

export const saveClient = async (payload) => await API.post(CLIENTS_URL, { payload });

export const getClientList = async (payload) => {
  const result = await API.get(CLIENTS_URL, { payload });
  return result.map((item) => ({ ...item, avatarUrl: avatarGenerator.generateRandomAvatar() }));
};
