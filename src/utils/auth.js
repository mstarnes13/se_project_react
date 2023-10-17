import { checkResponse } from "./Api";
export const baseUrl = "http://localhost:3001";

// signin
export const signIn = ({ email, password }) => {
  return fetch(`${baseUrl}/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

//register
export const register = ({email, password, name, avatar}) => {
  console.log('register: ', email, password, name, avatar)
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(checkResponse);
  // }).then(res => console.log('res: ', res));
};

// check token
export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
