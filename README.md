# term3d

## Display your lowpoly 3d models in the terminal!


## Instaltion :
```bash
npm i -g term3d
```

## Useage :
```bash
Display your low poly 3d models in the terminal!

Usage:
  ascii3d <your_model.obj> [Options]

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
```
