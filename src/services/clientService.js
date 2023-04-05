/* eslint-disable no-console */
/* eslint-disable no-debugger */
import { AvatarGenerator } from 'random-avatar-generator';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from './config';

const avatarGenerator = new AvatarGenerator();

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
  await deleteDoc(docRef);
  return docRef;
};

export const getClientList = async () => {
  const collectionRef = collection(db, 'clients');
  const querySnapshot = await getDocs(collectionRef);
  let resultDocs = [];
  querySnapshot.forEach((doc) => {
    resultDocs.push({ ...doc.data(), id: doc.id, avatarUrl: avatarGenerator.generateRandomAvatar() });
  });
  return resultDocs;
};
