const ACCESS_TOKEN_KEY = "ludofyToken";

export function GET_TOKEN() {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function SAVE_TOKEN(token) {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function CLEAR_TOKEN() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
}
