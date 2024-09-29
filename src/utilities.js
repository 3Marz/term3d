
export function print(terminal, x=1, y=1, str, ...args){
	terminal.moveTo.eraseLine.bgBlack.white(x,y,str, ...args);
}

export function rotatePoint(point, center, ax, ay, az){
	let a, b, c;
	let a1, b1, c1;
	let a2, b2, c2;
	let a3, b3, c3;
	let np3d = {x:0, y:0, z:0};

	a = point.x - center.x;
	b = point.y - center.y;
	c = point.z - center.z;

	a1 = a * Math.cos(az) - b * Math.sin(az);
	b1 = a * Math.sin(az) + b * Math.cos(az);
	c1 = c;

	c2 = c1 * Math.cos(ay) - a1 * Math.sin(ay);
	a2 = c1 * Math.sin(ay) + a1 * Math.cos(ay);
	b2 = b1;

	b3 = b2 * Math.cos(ax) - c2 * Math.sin(ax);
	c3 = b2 * Math.sin(ax) + c2 * Math.cos(ax);
	a3 = a2;

	np3d.x = a3;
	np3d.y = b3;
	np3d.z = c3;
	return np3d;
}

export function scalePoint(p, scale) {
		return {x: p.x*scale, y: p.y*scale, z:p.z*scale}
}

export function rotateModel(model, angleX, angleY, angleZ) {
	for(let i=0; i < model.verts.length; i++){
		model.verts[i] = rotatePoint(model.verts[i], 
																 {x:0,y:0,z:0},
																 angleX, angleY, angleZ);
	}
}

export function projectPoint(point, cam, fov, term){

	let x0 = point.x + cam.x;
	let y0 = point.y + cam.y;
	let z0 = point.z + cam.z;

	if( z0 < 20) {
		z0 = 20;
	}

	let x = ((x0 * fov) / z0) + (term.width/2);	
	let y = ((y0 * fov) / z0) + (term.height/2);

	return {x:Math.round(x), y:Math.round(y)}
}

