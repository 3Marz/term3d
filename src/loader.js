
import {readFileSync} from "node:fs"

export function readObjFile(file){
	let fileExtention = file.substring(file.lastIndexOf('.') + 1);
	fileExtention = fileExtention.toLowerCase();
	if(fileExtention != "obj") {
		throw new Error("The Only supported format is .obj");
	}

	var objFile = readFileSync(file, 'utf-8');

	var asArray = objFile.split('\n');
	
	var object = {
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
			
			let face = {
				verts: [],
				normals: [],
				char: '.'
			};

			for(let j = 1; j < words.length; j++) {
				let vert = words[j].split("/");
				if (Number(vert[0]-1) != -1){
					face.verts.push(Number(vert[0]) - 1)
				};
				face.normals.push(Number(vert[2]) - 1);
			}

			let fakeLight = {x:0, y:-50, z:50}
			let normal = face.normals[0] ? object.normals[face.normals[0]] : {x:0,y:0,z:0};
			let dot = (fakeLight.x*normal.x) + (fakeLight.y*normal.y) + (fakeLight.z*normal.z)
			let br = "%"
			if(dot > -50) { br = "%" }
			if(dot > -40) { br = "#" }
			if(dot > -30) { br = "*" }
			if(dot > -20) { br = "*" }
			if(dot > -10) { br = "+" }
			if(dot > 0) { br = "=" }
			if(dot > 10) { br = "~" }
			if(dot > 20)   { br = "-" }
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

