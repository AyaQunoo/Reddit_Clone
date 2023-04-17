/* eslint-disable no-console */
const { app } = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`you are listening on port ${PORT}`);
});
