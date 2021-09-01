import "../loginForm/loginForm";

export function saveTokenInLocalStorage(tokenDetails) {
  localStorage.setItem("access_token", tokenDetails.token);
}
