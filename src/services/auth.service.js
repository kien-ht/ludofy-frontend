import BaseService from "./base.service";

export async function makeRegister({ userName, password }) {
  try {
    return await BaseService({
      method: "POST",
      url: "/api/users/register",
      data: {
        userName,
        password,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export async function login({ userName, password }) {
  try {
    return await BaseService({
      method: "POST",
      url: "/api/users/login",
      data: {
        userName,
        password,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export async function verifyToken() {
  try {
    return await BaseService({
      method: "GET",
      url: "/api/users/verify",
    });
  } catch (err) {
    console.log(err);
  }
}
