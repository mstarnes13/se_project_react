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
export const register = (email, password, name, avatar, token) => {
  return fetch(`${baseUrl}/signUP`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(checkResponse);
};

// check token
export const checkToken = (token) => {
  return fetch(`${baseUrl}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
