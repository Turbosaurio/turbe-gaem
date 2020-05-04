# Turbogame
This is a personal project, started as jQuery, got a lot of stuff with that. Currently is using React and Redux but I haven't got as far as I got with jQuery yet. Still using lots of the graphic assets I did a couple of years ago.

#### Some of the stuff I got working with $, with lots of  'undefined's and errors:
* A* pathfinding algorithm for moving the player around avoiding non walkable tiles with some errors on very specific layouts.
* A rough menu of actions, some like moving between floors with actions.
* Camera buttons to rotate the map 45 degrees.
* Lots of sprites for different floors and colours.

#### Stuff working on currently using React:
* [x] Create Redux store with levels and configuration.
* [x] Render the map with square arrays, tiles position and sprite positioning.
* [x] Rotate camera, only what is displayed changes, values remain the same.
* [x] Create player which also rotates its position and face with the camera.
* [ ] Implement A* pathfinding algorithym as a simple function that receives the map, starting and end positions.