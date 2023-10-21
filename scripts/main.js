import {
  world,
  system
} from "@minecraft/server";

let myArray = [1];

const express = require('express');
const router = express.Router();
const port = process.env.PORT || 3000;

router.post('/api/message', async (req, res) => {
  let user = req.message;
  if(user!= null) world.sendMessage("喔YES收到了");
  if(user === 'fox') {
    myArray[0] = true;
  } else {
    myArray[1] = false;
  }
  res.json({ })
});

function getPlayer() {
const allPlayers = world.getAllPlayers();
if (allPlayers.length === 0) {
  return undefined;
}

return allPlayers[0];
}

function getPlayerDimension() {
const player = getPlayer();
if (player === undefined) {
  return undefined;
}
return player.dimension;
}

function getPlayerLocation() {
const player = getPlayer();
if (player === undefined) {
  return undefined;
}
return player.location;
}

function mainTick() {
if (system.currentTick % 200 === 0) {
  const playerDimension = getPlayerDimension();
  const playerLocation = getPlayerLocation();
  if (playerDimension !== undefined && playerLocation !== undefined) {
    if (playerDimension.id === "minecraft:overworld") { 
      if(myArray[0] === true) {
        playerDimension.spawnEntity("minecraft:fox", playerLocation); 
      } else {
        world.sendMessage("QQ捏捏好喝到咩噗");
      }
    } 
    else if (playerDimension.id === "minecraft:nether") { 
      playerDimension.spawnEntity("minecraft:hoglin", playerLocation); 
    }
    else {
      playerDimension.spawnEntity("minecraft:wolf", playerLocation);
    }
  }
}
system.run(mainTick);
}

system.run(mainTick);