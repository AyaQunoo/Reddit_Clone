/* eslint-disable no-shadow */
const signupForm = document.querySelector('.signupform');
const error = document.querySelector('.error.password');
const emailError = document.querySelector('.error.email');
const usernameError = document.querySelector('.error.username');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const obj = new FormData(signupForm);
  const data = Object.fromEntries(obj);
  if (data.username === '' || data.email === '' || data.password === '') {
    error.textContent = 'All fields are required';
  } else if (data.email.includes(' ') || !data.email.includes('@')) {
    emailError.textContent = 'Email is invalid';
  } else if (data.username.includes(' ')) {
    usernameError.textContent = 'Username cannot contain spaces';
  } else if (!data.password.match(/^[a-zA-Z0-9]{5,30}$/)) {
    error.textContent = 'Password must be between 5 and 30 characters and contain only letters and numbers';
  } else {
    fetch('users/signUp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((result) => result.json()).then((data) => {
      if (data.data.message === 'username is already Exists') {
        error.textContent = 'username is already used please choose another';
      } else if (data.data.message === 'email is already exists') {
        error.textContent = 'you already have anaccount please login';
      } else {
        error.textContent = 'your account has been created sucssfully!';
        error.style.color = 'green';
      }
    })
      .catch(console.log);
  }
});
