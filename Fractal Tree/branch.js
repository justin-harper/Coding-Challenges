function Branch(begin, end)
{
  this.begin = begin;
  this.end = end;
  this.branched = false;

  this
}

Branch.prototype.show = function()
{
  stroke(255);
  line(this.begin.x, this.begin.y, this.end.x, this.end.y);
}

Branch.prototype.branchRight = function()
{
  var d = p5.Vector.sub(this.end, this.begin);
  d.rotate(PI/4);
  d.mult(0.67);
  var newEnd = p5.Vector.add(this.end, d);
  return new Branch(this.end, newEnd);
}

Branch.prototype.branchLeft = function()
{
  var d = p5.Vector.sub(this.end, this.begin);
  d.rotate(-(PI/4));
  d.mult(0.67);
  var newEnd = p5.Vector.add(this.end, d);
  return new Branch(this.end, newEnd);
}

Branch.prototype.jiggle = function()
{
  this.end.x += random(-1, 1);
  this.end.y += random(-1, 1);
}
