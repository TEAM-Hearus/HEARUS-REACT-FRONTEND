export const checkAuthentication = () => {
  const token = localStorage.getItem('token');
  if (token != null) return true;
  else return false;
};
