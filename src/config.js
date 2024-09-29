


export let fov = 100;
export let far = 30;

export let pointChar = ".";
export let wireChar = ":";

export let color = "white"

export function setConfigs(config) {
	fov = config.fov;
	far = config.far;
	pointChar = config.pointChar;
	wireChar = config.wireChar;
	color = config.color
}

