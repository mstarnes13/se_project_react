export const baseUrl = "http://localhost:3001";

// signup
export const signup = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

// signin
export const signin = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

//register
export const register = (email, password, name, avatar, token) => {
  return fetch(`${baseUrl}/signUP`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }, token),
  }).then((response) => {
    try {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Registration failed");
      }
    } catch (e) {
      console.error(e);
      return e;
    }
  });
};

// check token
export const checkToken = (token) => {
  return fetch(`${baseUrl}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
