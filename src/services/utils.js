const VALID_USERS = [
  { email: 'latufmiguel@gmail.com', uid: 'iqBTIz01xdNvLjkrBGDTOayuCy03' },
  { email: 'manuelapiorno@gmail.com', uid: 'RYIXqEZymKV6sq9MYESsH1xOn1z2' },
];

export const isValidUser = (selectedUid) => !!VALID_USERS.map((u) => u.uid).includes(selectedUid);
