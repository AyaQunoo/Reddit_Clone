const postForm = document.querySelector('.create');
const error = document.querySelector('.error');
postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const obj = new FormData(postForm);
  const data = Object.fromEntries(obj);
  if (data.title === '') {
    error.textContent = 'this field cant be empty!!';
  } else {
    fetch('/users/post', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((result) => result.json()).catch(console.log);
  }
});
