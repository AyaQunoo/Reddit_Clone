const main = document.getElementById('main');
const posts_container = document.querySelector('.posts_container');
const renderPost = (data) => {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    const containerBox = document.createElement('div');
    containerBox.classList.add('container-box');

    const votes = document.createElement('div');
    votes.classList.add('votes');

    const votesWrapper = document.createElement('div');

    const upVoteButton = document.createElement('button');
    upVoteButton.innerHTML = '<i class="fas fa-arrow-up"></i>';

    const voteCount = document.createElement('h4');
    voteCount.textContent = data[i].up_votes;

    const downVoteButton = document.createElement('button');
    downVoteButton.innerHTML = '<i class="fas fa-arrow-down"></i>';

    const updateScroll = document.createElement('div');
    updateScroll.id = 'update-scroll';

    const innerContent = document.createElement('div');
    innerContent.id = 'inner-content';

    const top = document.createElement('div');
    top.classList.add('top');

    const user = document.createElement('div');
    user.classList.add('user');

    const userImg = document.createElement('img');
    userImg.src = 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fG5pbnRlbmRvfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=60';

    const userName = document.createElement('h4');
    userName.textContent = data[i].username;

    const userNameSpan = document.createElement('span');
    userNameSpan.textContent = data[i].created_at;

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

    // create comment as text
    const commentAsText = document.createElement('p');
    commentAsText.textContent = 'comment as ';

    // create username link
    const usernameLink = document.createElement('a');
    usernameLink.href = '#';
    usernameLink.textContent = 'user name';

    // append username link to comment as text
    commentAsText.appendChild(usernameLink);

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

    // append comment as text and comment form to add comment section
    addCommentSection.appendChild(commentAsText);
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
      }).then((result) => result.json()).then(console.log);
      window.location.reload();
    });
    // append add comment section and comment card section to comments container
    commentsContainer.appendChild(addCommentSection);
    commentsArr.forEach((comment) => {
      // create comment card section
      const commentCardSection = document.createElement('div');
      commentCardSection.classList.add('comment__card');

      // create user div
      const userDiv = document.createElement('div');
      userDiv.classList.add('user');

      // create user image
      const userImage = document.createElement('img');
      userImage.src = 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fG5pbnRlbmRvfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
      userImage.alt = '';

      // create user name
      const userName2 = document.createElement('h4');
      userName2.textContent = comment.commenter;

      // create created at span
      const createdAtSpan = document.createElement('span');
      createdAtSpan.textContent = comment.creted_at;

      // append created at span to user name
      userName2.appendChild(createdAtSpan);

      // append user image and user name to user div
      userDiv.appendChild(userImage);
      userDiv.appendChild(userName2);

      // create comment text
      const commentText = document.createElement('p');
      commentText.textContent = comment.comment;

      // append user div and comment text to comment card section
      commentCardSection.appendChild(userDiv);
      commentCardSection.appendChild(commentText);
      commentsContainer.appendChild(commentCardSection);
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

    const moreBtn = document.createElement('button');
    moreBtn.appendChild(document.createTextNode('...'));
    bottomDiv.appendChild(moreBtn);
    // Append the bottom div to an existing HTML element on the page, such as the body or a container div

    // append child elements
    containerBox.appendChild(votes);
    votes.appendChild(votesWrapper);
    votesWrapper.appendChild(upVoteButton);
    votesWrapper.appendChild(voteCount);
    votesWrapper.appendChild(downVoteButton);

    containerBox.appendChild(updateScroll);
    updateScroll.appendChild(innerContent);
    updateScroll.appendChild(commentsContainer);
    innerContent.appendChild(top);
    top.appendChild(user);
    user.appendChild(userImg);
    user.appendChild(userName);
    userName.appendChild(userNameSpan);
    top.appendChild(postButton);
    innerContent.appendChild(postTitle);
    innerContent.appendChild(postDesc);
    innerContent.appendChild(postImage);
    innerContent.appendChild(bottomDiv);
    posts_container.prepend(containerBox);
  }
};
