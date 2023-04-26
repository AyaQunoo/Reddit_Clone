/* eslint-disable no-undef */
const usernameSeaech = window.location.href.split('/').slice(-1)[0];
const name1 = document.querySelector('.name.userprofile');

const email = document.querySelector('.email');
fetch(`/users/profile/${usernameSeaech}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },

}).then((res) => res.json()).then((data) => {
  renderPost(data);
  name1.textContent = data[0].username;
  email.textContent = data[0].email;
});
