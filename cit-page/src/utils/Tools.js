const getAllAccounts = async () => {
  try {
    const response = await fetch('http://127.0.0.1:7002/accounts/get-all', { mode: 'cors' });
    const data = await response.json();
    console.log({ data });
    return data;
  } catch (e) {
    console.error(e);
  }
};

export default getAllAccounts;
