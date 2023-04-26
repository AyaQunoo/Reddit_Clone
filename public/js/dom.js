/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const posts_container = document.querySelector('.posts_container');

const resetTime = (creatAt) => {
  let theTime = '';
  const now = Date.now();
  const timesTamp = new Date(creatAt);
  const melSecond = now - timesTamp.getTime();
  const toMinutes = Math.floor(melSecond / (1000 * 60));
  const toHours = Math.floor(melSecond / (1000 * 60 * 60));
  if (melSecond < (1000 * 60 * 60)) {
    theTime = `${toMinutes} minutes ago `;
  } else if (melSecond < (1000 * 60 * 60 * 24)) {
    theTime = `${toHours} hours ago `;
  } else {
    theTime = timesTamp.toISOString().slice(0, 10);
  }

  return theTime;
};
const createComment = (comment) => {
  // create comment card section
  const commentCardSection = document.createElement('div');
  commentCardSection.classList.add('comment__card');

  // create user div
  const userDiv = document.createElement('div');
  userDiv.classList.add('user');

  // create user image
  const userImage = document.createElement('img');
  userImage.src = 'https://th.bing.com/th/id/OIP.R746etSe6jLms0H9VCGV7AAAAA?pid=ImgDet&rs=1';

  // create user name
  const userName2 = document.createElement('h4');
  userName2.textContent = comment.username;

  // create created at span
  const createdAtSpan = document.createElement('span');
  createdAtSpan.textContent = resetTime(comment.created_at);

  // append created at span to user name

  // append user image and user name to user div
  userDiv.appendChild(userImage);
  userDiv.appendChild(userName2);
  userDiv.appendChild(createdAtSpan);

  // create comment text
  const commentText = document.createElement('p');
  commentText.textContent = comment.comments;

  // append user div and comment text to comment card section
  commentCardSection.appendChild(userDiv);
  commentCardSection.appendChild(commentText);
  return commentCardSection;
};
const renderPost = (data) => {
  for (let i = 0; i < data.length; i++) {
    const containerBox = document.createElement('div');
    containerBox.classList.add('container-box');

    const votes = document.createElement('div');
    votes.classList.add('votes');

    const votesWrapper = document.createElement('div');

    const upVoteButton = document.createElement('button');
    upVoteButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    const voteCount = document.createElement('h4');

    upVoteButton.addEventListener('click', (e) => {
      fetch(`/users/up/${data[i].id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(() => fetch(`/users/votes/${data[i].id}`).then((res) => res.json()).then((data) => {
        voteCount.textContent = data.sum;
      }));
    });
    fetch(`/users/votes/${data[i].id}`).then((res) => res.json()).then((data) => {
      voteCount.textContent = data.sum;
    });

    const downVoteButton = document.createElement('button');
    downVoteButton.innerHTML = '<i class="fas fa-arrow-down"></i>';
    downVoteButton.addEventListener('click', (e) => {
      fetch(`/users/down/${data[i].id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(() => fetch(`/users/votes/${data[i].id}`).then((res) => res.json()).then((data) => {
        voteCount.textContent = data.sum;
      }));
    });
    votesWrapper.appendChild(upVoteButton);
    votesWrapper.appendChild(voteCount);
    votesWrapper.appendChild(downVoteButton);
    const updateScroll = document.createElement('div');
    updateScroll.id = 'update-scroll';

    const innerContent = document.createElement('div');
    innerContent.id = 'inner-content';

    const top = document.createElement('div');
    top.classList.add('top');

    const user = document.createElement('div');
    user.classList.add('user');

    const userImg = document.createElement('img');
    userImg.src = 'https://th.bing.com/th/id/OIP.R746etSe6jLms0H9VCGV7AAAAA?pid=ImgDet&rs=1';

    const userName = document.createElement('a');
    userName.classList.add('nameUser');
    userName.textContent = data[i].username;
    userName.href = `/profile/${data[i].username}`;

    const userNameSpan = document.createElement('span');
    userNameSpan.textContent = resetTime(data[i].created_at);

    const postButton = document.createElement('button');
    postButton.classList.add('button');
    postButton.textContent = 'join';

    const postTitle = document.createElement('h3');
    postTitle.textContent = data[i].title;
    const postDesc = document.createElement('p');
    postDesc.textContent = data[i].details;

    const postImage = document.createElement('img');
    postImage.classList.add('post-img');
    postImage.src = data[i].image_url;
    // bottom
    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('bottom');

    const commentBtn = document.createElement('button');
    commentBtn.classList.add('comment_section');
    // coments section
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments');

    commentBtn.addEventListener('click', () => {
      if (commentsContainer.style.display === 'none') {
        commentsContainer.style.display = 'block';
      } else {
        commentsContainer.style.display = 'none';
      }
    });
    const commentsArr = data[i].comments;
    // create add comment section
    const addCommentSection = document.createElement('div');
    addCommentSection.classList.add('add_comment');

    // create comment form
    const commentForm = document.createElement('form');

    // create comment text area
    const commentTextArea = document.createElement('textarea');
    commentTextArea.name = 'comment';
    commentTextArea.cols = '30';
    commentTextArea.rows = '6';
    commentTextArea.textContent = 'What are your thoughts?';

    // append comment text area to comment form
    commentForm.appendChild(commentTextArea);

    // create comment button
    const commentButton = document.createElement('button');
    commentButton.type = 'submit';
    commentButton.textContent = 'comment';

    // append comment button to comment form
    commentForm.appendChild(commentButton);

    // append comment as text and comment form to add comment sectio
    addCommentSection.appendChild(commentForm);
    // eslint-disable-next-line no-loop-func
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const obj = new FormData(commentForm);
      const data2 = Object.fromEntries(obj);
      fetch(`users/${data[i].id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data2),
      }).then((result) => result.json()).then((data) => {
        if (data.data.message === 'unauthorized') {
          alert('You must be logged in to add comment');
        }
        const comment = data.data[0];
        createComment(comment);
        const containerr = createComment(comment);
        commentsContainer.appendChild(containerr);
      });
    });
    // append add comment section and comment card section to comments container
    commentsContainer.appendChild(addCommentSection);
    commentsArr.forEach((comment) => {
      createComment(comment);
      const containerr = createComment(comment);
      commentsContainer.appendChild(containerr);
    });

    const commentIcon = document.createElement('i');
    commentIcon.classList.add('fas', 'fa-comment-alt');
    commentBtn.appendChild(commentIcon);
    commentBtn.appendChild(document.createTextNode('Comment'));
    bottomDiv.appendChild(commentBtn);

    const shareBtn = document.createElement('button');
    const shareIcon = document.createElement('i');
    shareIcon.classList.add('fas', 'fa-share');
    shareBtn.appendChild(shareIcon);
    shareBtn.appendChild(document.createTextNode('Share'));
    bottomDiv.appendChild(shareBtn);

    const saveBtn = document.createElement('button');
    const saveIcon = document.createElement('i');
    saveIcon.classList.add('fas', 'fa-bookmark');
    saveBtn.appendChild(saveIcon);
    saveBtn.appendChild(document.createTextNode('Save'));
    bottomDiv.appendChild(saveBtn);
    const divDrop = document.createElement('div');
    divDrop.classList.add('dropdown');
    const moreBtn = document.createElement('button');
    moreBtn.appendChild(document.createTextNode('...'));
    moreBtn.classList.add('more');
    const dropdownContent = document.createElement('div');
    dropdownContent.classList.add('dropdown-content');

    // create the Delete button
    const deleteBtn = document.createElement('a');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash');
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.addEventListener('click', (e) => {
      fetch(`/users/post/${data[i].id}`, {
        method: 'DELETE',
      }).then((res) => {
        if (res.status === 204) {
          containerBox.remove();
        }
      });
    });

    // add the buttons to the dropdown content container
    dropdownContent.appendChild(deleteBtn);
    divDrop.appendChild(moreBtn);
    divDrop.appendChild(dropdownContent);
    bottomDiv.appendChild(divDrop);
    // append child elements
    containerBox.appendChild(votes);
    votes.appendChild(votesWrapper);

    containerBox.appendChild(updateScroll);
    updateScroll.appendChild(innerContent);
    updateScroll.appendChild(commentsContainer);
    innerContent.appendChild(top);
    top.appendChild(user);
    user.appendChild(userImg);
    user.appendChild(userName);
    user.appendChild(userNameSpan);
    top.appendChild(postButton);
    innerContent.appendChild(postTitle);
    innerContent.appendChild(postDesc);
    innerContent.appendChild(postImage);
    innerContent.appendChild(bottomDiv);
    posts_container.append(containerBox);
  }
};
