var grid;
var next;

var Da = 1.0;
var Db = 0.5;
var feed = 0.055;
var kill = 0.062;


function setup()
{
  createCanvas(200, 200);
  pixelDensity(1);

  grid = [];
  next = [];
  for(var x = 0; x < width; x++)
  {
    grid[x] = [];
    next[x] = [];
    for(var y = 0; y < height; y++)
    {
      grid[x][y] = { a: 1, b: 0 };
      next[x][y] = { a: 1, b: 0 };
    }
  }

  for(var i = 100; i < 110; i++)
  {
    for (var j = 100; j < 110; j++)
    {
        grid[i][j].b = 1;
    }
  }
}

function draw()
{
  background(51);

  for(var x = 1; x < width - 1; x++)
  {
    for (var y = 1; y < height - 1; y++)
    {
      var a = grid[x][y].a;
      var b = grid[x][y].b;
      next[x][y].a = a + (Da * laplaceA(x , y)) - (a * b * b) + (feed * (1 - a));
      next[x][y].b = b + (Db * laplaceB(x , y)) + (a * b * b) - ((kill + feed) * b);

      next[x][y].a = constrain(next[x][y].a, 0, 1);
      next[x][y].b = constrain(next[x][y].b, 0, 1);
    }
  }

  loadPixels();
  for(var x = 0; x < width; x++)
  {
    for (var y = 0; y < height; y++)
    {
      var pix = (x + y * width) * 4;
      var a = next[x][y].a;
      var b = next[x][y].b;
      var c = constrain(floor((a-b) *255), 0, 255);

      pixels[pix + 0] = c;
      pixels[pix + 1] = c;
      pixels[pix + 2] = c;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
  swap();
}

function swap()
{
  var temp = next;
  grid = next;
  next = temp;
}

function laplaceA(x, y)
{

  var sum = 0;
  var center = -1;
  var neighbor = 0.2;
  var diag = 0.05;

  sum += grid[x][y].a     * center;
  sum += grid[x-1][y].a   * neighbor;
  sum += grid[x+1][y].a   * neighbor;
  sum += grid[x][y-1].a   * neighbor;
  sum += grid[x][y+1].a   * neighbor;
  sum += grid[x-1][y-1].a * diag;
  sum += grid[x+1][y-1].a * diag;
  sum += grid[x+1][y+1].a * diag;
  sum += grid[x-1][y+1].a * diag;

  return sum;
}

function laplaceB(x, y)
{

  var sum = 0;
  var center = -1;
  var neighbor = 0.2;
  var diag = 0.05;

  sum += grid[x][y].b     * center;
  sum += grid[x-1][y].b   * neighbor;
  sum += grid[x+1][y].b   * neighbor;
  sum += grid[x][y-1].b   * neighbor;
  sum += grid[x][y+1].b   * neighbor;
  sum += grid[x-1][y-1].b * diag;
  sum += grid[x+1][y-1].b * diag;
  sum += grid[x+1][y+1].b * diag;
  sum += grid[x-1][y+1].b * diag;

  return sum;
}
