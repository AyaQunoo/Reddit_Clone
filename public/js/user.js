const usernameAccount = document.querySelector('.username');
fetch('/users/profile').then((res) => res.json()).then((data) => {
  usernameAccount.textContent = data.user.username;
});
