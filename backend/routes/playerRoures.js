const express = require("express");
const {
  getAllPlayers,
  createNewPlayer,
  updatePlayer,
  getPlayer,
  deletePlayer,
} = require("../controllers/players");

const router = express.Router();
router.route("/").get(getAllPlayers).post(createNewPlayer);
router.route("/:id").patch(updatePlayer).get(getPlayer).delete(deletePlayer);

module.exports = router;
