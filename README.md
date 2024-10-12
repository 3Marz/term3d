# term3d

## Display your lowpoly 3d models in the terminal!

![](https://raw.githubusercontent.com/3Marz/term3d/main/assets/preview.gif)

## Instaltion :
```
npm i -g term3d
```
Also available in the AUR
```
yay -S term3d
```

## How does it work?
The renderer doesn't use the traditional <a href="https://en.wikipedia.org/wiki/3D_projection#Perspective_projection">perspective projection</a>
instead, it uses another projection method called <a href="https://en.wikipedia.org/wiki/3D_projection#Weak_perspective_projection">weak perspective projection</a>,
which is not common at all because its very limiting, but for a simple model viewer without a moving camera it's good enough,
plus it's very simple to implement here is the algorthim for it:
```
point2d.x = (point3d.x * fov) / point3d.z + (screenWidth/2)
point2d.y = (point3d.y * fov) / point3d.z + (screenHeight/2)
```

## Useage :
```
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
```

## TODOS

- [ ] Fix weird line rendering
- [ ] add custom ascii gradient based on user input
- [ ] support multiple file formats (.gltf/.glb, .stl, .fbx)
- [X] Add to the AUR

