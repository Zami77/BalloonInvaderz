//Constants
const LEFT = -2;
const RIGHT = 2;

const BALLOON_COUNT = 6;
const BALLOON_HEALTH = 10;
const BALLOON_SPEED = 2;

const BULLET_SPEED = 3;
const BULLET_MAX = 3;

//Modes
const MAIN_MENU = 0;
const GAME = 1;
const GAME_OVER = 2;
const WIN_GAME = 3;

//Variables
var mode;
var ship;
var drops =[];
var balloons = [];
var shotsFired = 0;
var totalScore = 0;
