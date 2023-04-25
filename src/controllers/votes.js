/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
const {
  addVote, allVotes, checkVote, updateVote,
} = require('../database/queries/votes');

const upVote = (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;
  checkVote(id, postId).then((data) => {
    if (data.rowCount) {
      let vote;
      data.rows[0].vote === 'upvote' ? (vote = 'none') : (vote = 'upvote');
      updateVote(vote, id, postId).then(() => res.status(201).json({
        error: false,
        message: 'vote has been  updated successfuly!!',
      }));
    } else {
      addVote(id, postId, 'upvote').then((data) => res.status(200).json({
        error: false,
        message: 'vote has been  added successfuly!!',
        vote: data.rows[0],
      }));
    }
  });
};

const sumVotes = (req, res) => {
  const { postId } = req.params;
  allVotes(postId).then((data) => res.status(200).json({
    error: false,
    message: 'success',
    sum: data.rows[0].all_votes++,
  }));
};
const downVote = (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;
  checkVote(id, postId).then((data) => {
    if (data.rowCount) {
      let vote;
      data.rows[0].vote === 'downvote' ? (vote = 'none') : (vote = 'downvote');
      updateVote(vote, id, postId).then(() => res.status(201).json({
        error: false,
        message: 'vote has been  updated successfuly!!',
      }));
    } else {
      addVote(id, postId, 'downvote').then((data) => res.status(200).json({
        error: false,
        message: 'vote has been  added successfuly!!',
        vote: data.rows[0],
      }));
    }
  });
};
module.exports = {
  sumVotes, downVote, upVote,
};
