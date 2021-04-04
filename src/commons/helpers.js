const ACCESS_TOKEN_KEY = "ludofyToken";

export function GET_TOKEN() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function SAVE_TOKEN(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function CLEAR_TOKEN() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}
