const fs = require("fs");

const players = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/players.json`)
);

exports.getAllPlayers = (_, res) => {
  res.status(200).json({ status: "success", data: { players } });
};

exports.getPlayer = (req, res) => {
  const id = 1 * req.params.id;
  const player = players.find((el) => el.id === id);
  res.status(200).json({ status: "success", data: { player } });
};

exports.createNewPlayer = async (req, res) => {
  const id = players.length;
  const newPlayer = Object.assign({ id }, req.body);
  players.push(newPlayer);
  await fs.writeFile(
    `${__dirname}/../data/players.json`,
    JSON.stringify(players, null, 2),
    (err) => {
      if (err) {
        res
          .status(500)
          .json({
            status: "fail",
            data: { status: "fail", data: { message: "failed to add player" } },
          });
      }
      res.status(201).json({ status: "success", data: { player: newPlayer } });
    }
  );
};
exports.updatePlayer = async (req, res) => {
  console.log("update player");
  const id = 1 * req.params.id;
  const indexToUpdate = players.findIndex((el) => el.id === id);
  players[indexToUpdate] = { ...players[indexToUpdate], ...req.body };
  await fs.writeFile(
    `${__dirname}/../data/players.json`,
    JSON.stringify(players, null, 2),
    (err) => {
      if (err) {
        res
          .status(500)
          .json({
            status: "fail",
            data: { status: "fail", data: { message: "failed to add player" } },
          });
      }
      res
        .status(200)
        .json({ status: "success", data: { player: players[indexToUpdate] } });
    }
  );
};
exports.deletePlayer = async (req, res) => {
  const id = 1 * req.params.id;
  const indexToRemove = players.findIndex((el) => el.id === id);
  const playerToRemove = players[indexToRemove];
  players.splice(indexToRemove, 1);
  await fs.writeFile(
    `${__dirname}/../data/players.json`,
    JSON.stringify(players, null, 2),
    (err) => {
      if (err) {
        res
          .status(400)
          .json({
            status: "fail",
            data: { status: "fail", data: { message: "failed to add player" } },
          });
      }
      res
        .status(200)
        .json({ status: "success", data: { player: playerToRemove } });
    }
  );
};
