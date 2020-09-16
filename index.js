const app = require("./src/app");
const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server started on port: ${PORT}`);
});
