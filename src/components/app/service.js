import "../login-form/login-form";

export function saveTokenInLocalStorage(tokenDetails) {
  localStorage.setItem("userDetails", tokenDetails.token);
}
