
import {Mode, readFileSync} from "node:fs"
import type { Point3d, Face, Model } from "./types.ts"

export function readModel(file : string) {
	let fileExtention = file.substring(file.lastIndexOf('.') + 1);
	fileExtention = fileExtention.toLowerCase();
	let model: Model = {
		verts: [],
		normals: [],
		faces: []
	}
	switch (fileExtention) {
		case "obj":
			model = readObjFile(file);
			break;
		default:
			throw new Error(`File extension ${fileExtention} not supported.`);
	}
	return model;
}

export function readObjFile(file : string){
	var objFile = readFileSync(file, 'utf-8');

	var asArray = objFile.split('\n');
	
	var object : Model = {
		verts: [
		],
		normals: [
		],
		faces: [
		]
	};

	for(let i = 0; i < asArray.length; i++){
		let words = asArray[i].split(' ');

		if(words[1] == ""){ words.splice(1,1) }

		if(words[0] == "v"){
			object.verts.push({ x:Number(words[1]),
													y:Number(words[2]),
													z:Number(words[3]) });
		} 
		else if (words[0] == "vn"){
		object.normals.push({ x:Number(words[1]),
													y:Number(words[2]),
													z:Number(words[3]) });

		}
		else if (words[0] == "f"){
			
			let face : Face = {
				verts: [],
				normals: [],
				char: '.'
			};

			for(let j = 1; j < words.length; j++) {
				let vert : string[] = words[j].split("/");
				if (+vert[0]-1 != -1){
					face.verts.push(Number(vert[0]) - 1)
				};
				face.normals.push(Number(vert[2]) - 1);
			}

			let fakeLight : Point3d = {x:0, y:-50, z:50}
			let normal : Point3d = face.normals[0] ? object.normals[face.normals[0]] : {x:0,y:0,z:0};
			let dot : number = (fakeLight.x*normal.x) + (fakeLight.y*normal.y) + (fakeLight.z*normal.z)
			let br = "%"
			if(dot > -50) { br = "%" }
			if(dot > -40) { br = "#" }
			if(dot > -30) { br = "*" }
			if(dot > -20) { br = "*" }
			if(dot > -10) { br = "+" }
			if(dot > 0)   { br = "=" }
			if(dot > 10)  { br = "~" }
			if(dot > 20)  { br = "-" }
			if(dot > 30)  { br = ":" }
			if(dot > 40)  { br = "," }
			if(dot > 50)  { br = "." }
			face.char = br;

			
			object.faces.push(
				face
			);

		}


	}
	
	return object;
}

