const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Notebook Express Demo is running on http://localhost:${PORT}`);
});
