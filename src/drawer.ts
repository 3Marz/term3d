
import { scalePoint, projectPoint } from "./utilities.js";
import { pointChar, wireChar, far, fov, color } from "./config.js";
import type { DrawType, Model, Point2d, Point3d } from "./types.js";
import type { ScreenBuffer, Terminal } from "terminal-kit";
import type { PutOptions } from "terminal-kit/ScreenBuffer.js";

function drawLine(p0: Point2d, p1: Point2d, canvas: ScreenBuffer, char=",") {
	
	let dx = p1.x - p0.x; 
  let dy = p1.y - p0.y; 
	let step; 
  
  if (Math.abs(dx) > Math.abs(dy)) { 
		step = Math.abs(dx);
	} else {
		step = Math.abs(dy);
	}
  
  let x_incr = (dx / step); 
  let y_incr = (dy / step); 
  
  let x = p0.x; 
  let y = p0.y; 
  
  for (let i = 0; i < step; i++) { 
		//console.log(round(x) + " " + round(y)); 
		let putOption : PutOptions = {
			x:Math.round(x),
			y:Math.round(y),
			attr: {
				color: color
			},
			wrap: false,
			dx: 0,
			dy: 0
		}

		canvas.put(putOption, char);

  	x += x_incr; 
    y += y_incr; 
  }

}

function fillBottomFlatTri(v1: Point2d, v2: Point2d, v3: Point2d, canvas: ScreenBuffer, char="#"){
	let invslope1 = (v2.x - v1.x) / (v2.y - v1.y);
	let invslope2 = (v3.x - v1.x) / (v3.y - v1.y);

	let curx1 = v1.x;
	let curx2 = v1.x;

	for(let scanlineY = v1.y; scanlineY <= v2.y; scanlineY++){
		drawLine({x:curx1, y:scanlineY}, {x:curx2, y:scanlineY} , canvas, char);
		curx1 += invslope1;
		curx2 += invslope2;
	}
}

function fillTopFlatTri(v1: Point2d, v2: Point2d, v3: Point2d, canvas: ScreenBuffer, char="#"){
	let invslope1 = (v3.x - v1.x) / (v3.y - v1.y);
	let invslope2 = (v3.x - v2.x) / (v3.y - v2.y)

	let curx1 = v3.x;
	let curx2 = v3.x;

	for(let scanlineY = v3.y; scanlineY > v1.y; scanlineY--){
		drawLine({x:curx1, y:scanlineY}, {x:curx2, y:scanlineY}, canvas, char);
		curx1 -= invslope1;
		curx2 -= invslope2;
	}
}

function drawTriangle(p1: Point2d, p2: Point2d, p3: Point2d, canvas: ScreenBuffer, char="#"){

	if(p1.y > p2.y) {[p1, p2] = [p2, p1]}
	if(p1.y > p3.y) {[p1, p3] = [p3, p1]}
	if(p2.y > p3.y) {[p2, p3] = [p3, p2]}

	if (p2.y == p3.y){
		fillBottomFlatTri(p1, p2, p3, canvas, char);
	}
	else if (p1.y == p2.y) {
		fillTopFlatTri(p1, p2, p3, canvas, char);
	}
	else {
		let p4 = {
			x:Math.floor(p1.x + ((p2.y - p1.y) / (p3.y - p1.y)) * (p3.x - p1.x)),
			y:p2.y
		}
		
		fillBottomFlatTri(p1, p2, p4, canvas, char);
		fillTopFlatTri(p2, p4, p3, canvas, char);

	}
	
}

// -----------------------------------------------------

function pointsDraw(model: Model, term: Terminal, canvas: ScreenBuffer, scaleFactor: number, cam: Point3d) {
	for(let i=0; i < model.verts.length; i++){
		let p3d = model.verts[i];
		
		var scaledPoint = scalePoint(p3d, scaleFactor);

		let p = projectPoint(scaledPoint, cam, fov, term);

		if(scaledPoint.z < far) {
			let putOptions : PutOptions = {
				x:p.x,
				y:p.y,
				attr: {
					color: color
				},
				wrap: false,
				dx: 0, dy: 0,
			}

			canvas.put(putOptions, pointChar)
		}
	}
}

function wireDraw(model: Model, term: Terminal, canvas: ScreenBuffer, scaleFactor: number, cam: Point3d) {
	for(let j = 0; j < model.faces.length; j++){
		const face = model.faces[j];
		let lastVert = 1;
		for(let i = 0; i < face.verts.length-2; i++){

			let p1 = scalePoint(model.verts[face.verts[0]], scaleFactor);
			let p2 = scalePoint(model.verts[face.verts[lastVert]], scaleFactor);
			let p3 = scalePoint(model.verts[face.verts[lastVert+1]], scaleFactor);
			
			let p2d1 = projectPoint(p1, cam, fov, term);		
			let p2d2 = projectPoint(p2, cam, fov, term);		
			let p2d3 = projectPoint(p3, cam, fov, term);		

			if(p1.z < far && p2.z < far){
				drawLine(p2d1, p2d2, canvas, wireChar)
			} 
			if(p2.z < far && p3.z < far){
				drawLine(p2d2, p2d3, canvas, wireChar)
			} 
			if(p3.z < far && p1.z < far){
				drawLine(p2d3, p2d1, canvas, wireChar)
			}

			lastVert++
		}

	}
}

function fillDraw(model: Model, term: Terminal, canvas: ScreenBuffer, scaleFactor: number, cam: Point3d) {
	for(let j = 0; j < model.faces.length; j++){
		const face = model.faces[j];
		let lastVert = 1;
		for(let i = 0; i < face.verts.length-2; i++){

			let p1 = scalePoint(model.verts[face.verts[0]], scaleFactor);
			let p2 = scalePoint(model.verts[face.verts[lastVert]], scaleFactor);
			let p3 = scalePoint(model.verts[face.verts[lastVert+1]], scaleFactor);

			let p2d1 = projectPoint(p1, cam, fov, term);		
			let p2d2 = projectPoint(p2, cam, fov, term);		
			let p2d3 = projectPoint(p3, cam, fov, term);		

			drawTriangle(p2d1, p2d2, p2d3, canvas, face.char);

			lastVert++
		}

	}
}

const drawingMethods = {
	"points": pointsDraw,
	"wire": wireDraw,
	"fill": fillDraw,
}

export function drawModel(model: Model, scaleFactor: number, cam: Point3d, type: DrawType ="points", term: Terminal, canvas: ScreenBuffer){

	model.faces.sort((f1, f2) => {
		let mid1;
		let mid2;

		let numOfVert1 = f1.verts.length;
		let numOfVert2 = f2.verts.length;

		let po1 = {z:0};
		let po2 = {z:0};

		for(let i = 0; i < f1.verts.length;i++){
			let point = model.verts[f1.verts[i]];
			po1.z += point.z
		}
		for(let i = 0; i < f2.verts.length;i++){
			let point = model.verts[f2.verts[i]];
			po2.z += point.z
		}

		mid1 = {
			z:po1.z/numOfVert1,
		}

		mid2 = {
			z:po2.z/numOfVert2,
		}

		if(mid1.z > mid2.z){
			return 1;
		}else {
			return -1;
		};
	})

	drawingMethods[type](model, term, canvas, scaleFactor, cam)

}


