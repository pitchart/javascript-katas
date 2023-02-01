exports = typeof window !== "undefined" && window !== null ? window : global;

const GameRunner = require('./old/gameRunner');

const gameRunner = new GameRunner();
gameRunner.play();