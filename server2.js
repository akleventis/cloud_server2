const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8081;

app.use(bodyParser.json());

const pickRandom = () => {
  const rpc = ["rock", "paper", "scissors"];
  return rpc[Math.floor(Math.random() * 3)];
}

const rockPaperScissors = (server1, server2) => {
  const [s1, s2] = ["server 1", "server 2"];
  if (server1 === server2) return "tie";
  if (server1 === "rock") return server2 === "paper" ? s2 : s1;
  if (server1 === "paper") return server2 === "scissors" ? s2 : s1;
  if (server1 === "scissors") return server2 === "rock" ? s2 : s1;
};

// receive server1 move
// pick random and determine winner
// send struct back with server moves and winner
app.post("/", async (req, res) => {
  const server1move = req.body.move;
  const server2move = pickRandom();

  let champion = rockPaperScissors(server1move, server2move);

  returnBody = {
    "server1": server1move,
    "server2": server2move,
    "champion": champion,
  };

  res.send(JSON.stringify(returnBody));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
