//DFS Recusive Backtracker

var cols;
var rows;
var w = 10;
var grid = [];
var current;

var stack = [];

function setup()
{
  createCanvas(600, 600);
  cols = floor(width / w);
  rows = floor(height / w);

  for(var j = 0; j < rows; j++)
  {
    for(var i = 0; i < cols; i++)
    {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];

}

function draw()
{
  background(51);
  for(var i of grid)
  {
    i.show();
  }

  current.visited = true;
  current.highlight();
  //Step 1
  var next = current.checkNeighbors();
  if(next)
  {
    next.visited = true;
    //Step 2
    stack.push(current);
    //Step 3
    removeWalls(current, next);

    //Step 4
    current = next;
  }
  else if(stack.length > 0)
  {
    current = stack.pop();      
  }

}

function removeWalls(a, b)
{
  var x = a.i - b.i;
  var y = a.j - b.j;

  if(x === 1)
  {
    a.walls.left  = false;
    b.walls.right = false;
  }
  else if( x === -1)
  {
    a.walls.right = false;
    b.walls.left  = false;
  }
  else if(y === 1)
  {
    a.walls.top     = false;
    b.walls.bottom  = false;
  }
  else if( y === -1)
  {
    a.walls.bottom  = false;
    b.walls.top     = false;
  }

}
