#!/usr/bin/env node  

import kit from "terminal-kit";
import { readModel } from "./loader.js"
import { rotateModel } from "./utilities.js"
import { drawModel } from "./drawer.js";
import { setConfigs } from "./config.js";
import meow from "meow";
import type { DrawType } from "./types.js";

const { terminal } = kit;
var canvas = new kit.ScreenBuffer({
	dst: terminal,
	width: terminal.width,
	height: terminal.height
})

var cam = {x:0, y:0, z:400}

var cli = meow(`
Display your low poly 3d models in the terminal!

Usage:
  term3d <your_model.obj> [Options]

Options:
  --view     -v      The View type either "fill" or "wire" of "points"
  --fov=100  -f      The fov of the camera
  --far=100          The far plane of rendering
  --scale    -s=50   Model scale, if there is no model displaing lower it
  --y-speed  -y=0.05 Sets the speed of rotation around the y axis   
  --point-char=.     The character of point rendering
  --wire-char=:      The character of wire rendering
  --color    -c      black, gray, white, red, blue, yellow, green, magenta, cyan, brightBlack, brightWhite, brightRed, brightBlue, brightYellow, brightGreen, brightMagenta, brightCyan

Controls:
  Arrow keys : move the camera
  z-x        : move the camera closer and fearther 
  1-2-3      : change the drawing mode
  w-s        : rotate along the x axis
  a-d        : rotate along the z axis
  e          : toggle y rotation

`, {
		importMeta: import.meta,
		autoHelp: true,
		flags: {
			view: {
				type: 'string',
				choices: ['wire', 'points', 'fill'],
				shortFlag: 'v',
				default: 'fill'
			},
			fov: {
				type: 'number',
				default: 100,
			},
			far: {
				type: 'number',
				default: 100,
			},
			ySpeed: {
				type: 'number',
				default: 0.05,
				shortFlag: 'y'
			},
			pointChar: {
				type: 'string',
				default: "."
			},
			wireChar: {
				type: 'string',
				default: ":"
			},
			color: {
				type: 'string',
				shortFlag: 'c',
				choices: ['black', 'white', 'red', 'blue', 'yellow', 'green', 'magenta', 'cyan', 'gray',
								'brightBlack', 'brightWhite', 'brightRed', 'brightBlue', 'brightYellow', 'brightGreen', 'brightMagenta', 'brightCyan'],
				default: 'white'
			},
			scale: {
				type: 'number',
				shortFlag: 's',
				default: 50,
			}
		}
	})

setConfigs(cli.flags)

var file : string | undefined = cli.input.at(0) ? cli.input.at(0) : "";

if(file == undefined || file.length == 0) {
	throw new Error("No file provided")
}

var model = readModel(file);
var viewType: DrawType = cli.flags.view as DrawType; 
var rotateY = true;
const rotateYSpeed  = cli.flags.ySpeed
var scaleFactor = cli.flags.scale;

function terminate(){
	terminal.hideCursor(false)
	process.exit()	
}

function input(key: string) {
	switch(key) {

		case 'w':
			rotateModel(model, 0.1, 0, 0);
			break;

		case 's':
			rotateModel(model, -0.1, 0, 0);
			break;

		case 'a':
			rotateModel(model, 0, 0, 0.1);
			break;

		case 'd':
			rotateModel(model, 0, 0, -0.1);
			break;

		case 'UP':
			cam.y++;
			break;

		case 'DOWN':
			cam.y--;
			break;

		case 'LEFT':
			cam.x++;
			break;

		case 'RIGHT':
			cam.x--;
			break;

		case 'z':
			cam.z-=5;
			break;
		
		case 'x':
			cam.z+=5;
			break;

		case 'e':
			rotateY = !rotateY;
			break;

		case '1':
			viewType = 'points';
			break;

		case '2':
			viewType = 'wire';
			break;

		case '3':
			viewType = 'fill';
			break;

		case 'q':
		case 'CTRL_C':
			terminate()
			break
	}
}

function init() {
	terminal.hideCursor()
	terminal.clear()
	terminal.grabInput({})
	terminal.on('key', input)
}

init()
function animate(){

	if (rotateY) {
		rotateModel(model, 0, rotateYSpeed, 0);
	}
	
	drawModel(model, -scaleFactor, cam, viewType, terminal, canvas);

	canvas.draw({delta:true})
	canvas.fill({attr:{bgDefaultColor:true}});
	setTimeout(animate, 20)
}
animate()


