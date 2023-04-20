/* eslint-disable no-shadow */
const loginForm = document.querySelector('.loginForm');
const errorLogin = document.querySelector('.error.login');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const obj = new FormData(loginForm);
  const data = Object.fromEntries(obj);
  if (data.email === '' || data.password === '') {
    errorLogin.textContent = 'All fields are required';
  }
  fetch('users/logIn', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json()).then((data) => {
    if (data.data.message === 'wrong password') {
      errorLogin.textContent = 'wrong password';
    } else if (data.data.message === 'user does not exist!please create an account') {
      errorLogin.textContent = 'user does not exist!please create an account';
    } else if (data.data.message === 'succes') {
      window.location.href = '/userhome';
    }
  });
});
