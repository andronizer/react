import "../login-form/login-form";

export function saveTokenInLocalStorage(tokenDetails) {
  localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
}
// const token = localStorage.getItem("userDetails");
