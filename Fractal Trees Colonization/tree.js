function Tree()
{
  this.leaves = [];
  this.branches = [];

  for(var i = 0; i < 500; i++)
  {
    this.leaves.push(new Leaf());
  }

  var pos = createVector(width / 2, height);
  var d = createVector(0, -1);
  var root = new Branch(null, pos, d);
  this.branches.push(root);
  var found = false;
  var current = root;

  while(!found)
  {
    for(var i of this.leaves)
    {
      var dist = p5.Vector.dist(current.pos, i.pos);
      if(dist < maxD)
      {
        found = true
      }
    }

    if(!found)
    {
      var branch = current.next();
      current = branch;

      this.branches.push(current);
    }
  }
}

Tree.prototype.show = function()
{
  for(var i of this.leaves)
  {
    i.show();
  }

  for(var j of this.branches)
  {
    j.show();
  }
}

Tree.prototype.grow = function()
{
    for(var i of this.leaves)
    {
      var closestBranch = null;
      var record = 100000;
      for(var j of this.branches)
      {
        var d = p5.Vector.dist(i.pos, j.pos);
        if(d < minD)
        {
          i.reached = true;
          closestBranch = null;
          break;
        }
        else if(d > maxD)
        {
          continue;
        }
        else if(closestBranch == null || d < record)
        {
          closestBranch = j;
          record = d;
        }
      }
      if(closestBranch != null)
      {
        var newDir = p5.Vector.sub(i.pos, closestBranch.pos);
        newDir.normalize();
        closestBranch.d.add(newDir);
        closestBranch.count++;
      }
    }

    for(var i = this.leaves.length -1; i >= 0; i--)
    {
      if(this.leaves[i].reached)
      {
        this.leaves.splice(i, 1);
      }
    }

    for(var i = this.branches.length-1; i >= 0; i--)
    {
      var branch = this.branches[i];
      if(branch.count > 0)
      {
        branch.d.div(branch.count+1);
        this.branches.push(branch.next());
      }
      branch.reset();
    }
};
