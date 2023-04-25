/* eslint-disable no-undef */

fetch('users/allPosts').then((res) => res.json()).then((data) => {
  renderPost(data);
});
