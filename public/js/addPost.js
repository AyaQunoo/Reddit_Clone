const postForm = document.querySelector('.create');
const error = document.querySelector('.error');
const post = document.querySelector('.created');
postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const obj = new FormData(postForm);
  const data = Object.fromEntries(obj);
  if (data.title === '') {
    error.textContent = 'this field cant be empty!!';
  } else if (data.title.length < 3 || data.title.length > 20) {
    error.textContent = 'the title cant be less than 3 or larger than 20 charachter';
  } else {
    fetch('/users/post', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((result) => result.json()).then((data) => {
      if (!data.error) {
        post.textContent = 'post created successfully';
      }
    }).catch(console.log);
  }
});
