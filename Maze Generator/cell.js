function Cell(i,j)
{
  this.i = i;
  this.j = j;
  this.walls = new Wall();
  this.visited = false;
}

Cell.prototype.show = function()
{
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);
    if(this.walls.top)
    {
      line(x,y, x+w, y);
    }
    if(this.walls.right)
    {
      line(x+w, y, x+w, y+w);
    }
    if(this.walls.bottom)
    {
      line(x+w, y+w, x, y+w);
    }
    if(this.walls.left)
    {
      line(x, y+w, x,y);
    }

    if(this.visited)
    {
      noStroke();
      fill(255, 0 , 255, 100);
      rect(x, y, w, w);
    }
};

Cell.prototype.index = function (i, j)
{
    if(i < 0 || j < 0 || i > cols -1 || j > rows -1)
    {
      return - 1;
    }
    else
    {
        return i + j * cols;
    }
};

Cell.prototype.checkNeighbors = function()
{
    var neighbors = [];

    var top     = grid[this.index(this.i,   this.j-1)];
    var right   = grid[this.index(this.i+1, this.j)];
    var bottom  = grid[this.index(this.i,   this.j+1)];
    var left    = grid[this.index(this.i-1, this.j)];

    if(top && !top.visited)
    {
      neighbors.push(top);
    }
    if(right && !right.visited)
    {
      neighbors.push(right);
    }
    if(bottom && !bottom.visited)
    {
      neighbors.push(bottom);
    }
    if(left && !left.visited)
    {
      neighbors.push(left);
    }

    if(neighbors.length > 0)
    {
      return neighbors[floor(random(0, neighbors.length))];
    }
    else
    {
      return undefined;
    }
};

Cell.prototype.highlight = function()
{
    var x = this.i * w;
    var y = this.j * w;
    noStroke();
    fill(0,255,100, 200);
    rect(x, y, w, w);
};

function Wall()
{
  this.top    = true;
  this.right  = true;
  this.bottom = true;
  this.left   = true;
}
