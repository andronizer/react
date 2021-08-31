import "../loginForm/loginForm";

export function saveTokenInLocalStorage(tokenDetails) {
  localStorage.setItem("userDetails", tokenDetails.token);
}
