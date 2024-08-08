import { AvatarGenerator } from 'random-avatar-generator';
import API from './api';

const avatarGenerator = new AvatarGenerator();
const CLIENTS_URL = 'clients';

export const deleteClient = async (id) => await API.delete(`${CLIENTS_URL}/${id}`);

export const getClient = async (id) => {
  const result = await API.get(`${CLIENTS_URL}/${id}`);
  const { data } = result;
  return data;
};

export const saveClient = async (payload) => await API.post(CLIENTS_URL, payload);

export const updateClient = async (id, payload) => await API.patch(`${CLIENTS_URL}/${id}`, payload);

export const getClientList = async (payload) => {
  const result = await API.get(CLIENTS_URL, payload);
  const { data } = result;
  return data.map((item) => ({ ...item, avatarUrl: avatarGenerator.generateRandomAvatar() }));
};
