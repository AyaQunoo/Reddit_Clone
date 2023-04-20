const clientError = (req, res) => {
  res.status(404).json({
    error: true,
    data: {
      message: '404 NOT FOUND!!!',
    },
  });
};
module.exports = { clientError };
