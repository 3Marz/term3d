import { readObjFile } from '../src/loader.js' 
import { readFileSync } from "node:fs"

const cubeObj = {"verts":[{"x":-1,"y":-1,"z":1},{"x":-1,"y":1,"z":1},{"x":-1,"y":-1,"z":-1},{"x":-1,"y":1,"z":-1},{"x":1,"y":-1,"z":1},{"x":1,"y":1,"z":1},{"x":1,"y":-1,"z":-1},{"x":1,"y":1,"z":-1}],"normals":[{"x":-1,"y":0,"z":0},{"x":0,"y":0,"z":-1},{"x":1,"y":0,"z":0},{"x":0,"y":0,"z":1},{"x":0,"y":-1,"z":0},{"x":0,"y":1,"z":0}],"faces":[{"verts":[1,2,0],"normals":[0,0,0],"char":"+"},{"verts":[3,6,2],"normals":[1,1,1],"char":"%"},{"verts":[7,4,6],"normals":[2,2,2],"char":"+"},{"verts":[5,0,4],"normals":[3,3,3],"char":","},{"verts":[6,0,2],"normals":[4,4,4],"char":","},{"verts":[3,5,7],"normals":[5,5,5],"char":"%"},{"verts":[1,3,2],"normals":[0,0,0],"char":"+"},{"verts":[3,7,6],"normals":[1,1,1],"char":"%"},{"verts":[7,5,4],"normals":[2,2,2],"char":"+"},{"verts":[5,1,0],"normals":[3,3,3],"char":","},{"verts":[6,4,0],"normals":[4,4,4],"char":","},{"verts":[3,1,5],"normals":[5,5,5],"char":"%"}]} 
const archObj = readFileSync("models/testModel.txt", "utf-8"); 

test("Load Obj file", () => {
	expect(JSON.stringify(readObjFile("models/box.obj"))).toStrictEqual(JSON.stringify(cubeObj))
	expect(JSON.stringify(readObjFile("models/Arch.obj"))).toStrictEqual(archObj)
})

