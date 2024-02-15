// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Handle POST requests to /data
server.post("/data", (req, res) => {
  const newData = req.body;
  // Update the db.json file with the new data
  router.db.get("data").push(newData).write();
  res.status(200).json(newData);
});

server.use(router);

const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
