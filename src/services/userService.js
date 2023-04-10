import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { auth } from './config';
import { isValidUser } from './utils';

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const credential = await signInWithPopup(auth, googleProvider);
  return isValidUser(credential.user.uid) ? credential : false;
};

export const logout = () => signOut(auth);
