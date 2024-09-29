import { Terminal } from "terminal-kit";
import { scalePoint, rotatePoint, projectPoint } from "../src/utilities.js";

const point1 = {x: 3, y: 3, z: 3};
const point2 = {x:-4, y:-1, z:-1};
const center = {x: 0, y: 0, z: 0};
const fakeTerm = {width:50, height:50}
const fakeCam = {x:0, y:0, z:100}

test("Scale Point", () => {
	expect(scalePoint(point1, 2)).toStrictEqual({x:6, y:6, z:6})
	expect(scalePoint(point1, -5)).toStrictEqual({x:-15, y:-15, z:-15})
	expect(scalePoint(point2, -2)).toStrictEqual({x:8, y:2, z:2})
})

test("Rotate Point", () => {
	expect(rotatePoint(point1, center, Math.PI/2, 0, 0)).toStrictEqual({x:3, y:-3, z:3})
	expect(rotatePoint(point1, center, 0, Math.PI/2, 0)).toStrictEqual({x:3, y:3, z:-3})
	expect(rotatePoint(point1, center, 0, 0, Math.PI/2)).toStrictEqual({x:-3, y:3, z:3})
})

test("Fake 3D Projection", () => {
	expect(projectPoint(point1,fakeCam, 100, fakeTerm as Terminal)).toStrictEqual({x:28, y:28})
	expect(projectPoint(center,fakeCam, 100, fakeTerm as Terminal)).toStrictEqual({x:25, y:25})
})

