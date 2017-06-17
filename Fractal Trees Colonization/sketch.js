var tree;
var maxD = 200;
var minD = 10;


function setup()
{
  createCanvas(400, 400);
  tree = new Tree();
}

function draw()
{
  background(51);
  tree.show();
  tree.grow();
}
