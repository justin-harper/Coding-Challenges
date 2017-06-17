function Branch(parrent, pos, d)
{
  this.pos = pos;
  this.parrent = parrent;
  this.d = d;
  this.count = 0;
  this.origD = this.d.copy();
  this.len = 5;
}

Branch.prototype.next = function()
{
    //this.d.normalize();
    //var nextDir = p5.Vector.mult(this.d, this.len);
    var nextPos = p5.Vector.add(this.pos, this.d);
    return new Branch(this, nextPos, this.d.copy());
};

Branch.prototype.show = function()
{
    if(this.parrent != null)
    {
      stroke(255);
      line(this.pos.x, this.pos.y, this.parrent.pos.x, this.parrent.pos.y);
    }
};

Branch.prototype.reset = function()
{
  this.d = this.origD.copy();
  this.count = 0;
};
