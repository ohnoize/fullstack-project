let globalToken = '';

export const saveToken = (string) => {
  globalToken = string;
};

export const getToken = () => globalToken;
