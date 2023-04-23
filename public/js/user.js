/* eslint-disable no-undef */

fetch('users/allPosts').then((res) => res.json()).then((data) => {
    console.log(data);
    renderPost(data);
});
