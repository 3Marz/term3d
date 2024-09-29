
export type Point2d = {
	x: number,
	y: number
}

export type Point3d = {
	x: number,
	y: number,
	z: number
}

export type Face = {
	verts: number[],
	normals: number[],
	char: string,
}

export type Model = {
	verts: Point3d[],
	normals: Point3d[],
	faces: Face[],
}

export type DrawType = "points" | "wire" | "fill"



