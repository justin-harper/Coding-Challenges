var angle = 0;
var slider;
var tree = [];
var leaves = [];

var count = 0;


function setup()
{
  createCanvas(400, 400);
  var a = createVector(width/2, height);
  var b = createVector(width/2, height - 100);
  var root = new Branch(a, b);
  tree[0] = root;

}

function mousePressed()
{
  console.log("HI");
  for(var i = tree.length-1; i >= 0; i--)
  {
    if(tree[i].branched == false)
    {
      tree.push(tree[i].branchRight());
      tree.push(tree[i].branchLeft());
      tree[i].branched = true;
    }
  }
  count++;

  if(count === 5)
  {
    for(var i of tree)
    {
      if(!i.branched)
      {
        var leaf = i.end.copy();
        leaves.push(leaf);
      }
    }
  }
}

function draw()
{
  background(51);
  for(var i of tree)
  {
    i.show();
    //i.jiggle();
  }

  for(var i of leaves)
  {
    noStroke();
    fill(255, 0, 100);
    ellipse(i.x, i.y, 8, 8);
    i.y += 1;
  }
}

// function branch(len)
// {
//   line(0, 0, 0, -len);
//   translate(0, -len);
//
//   if(len > 4)
//   {
//     push();
//     rotate(angle);
//     branch(len * 0.67);
//     pop();
//     push();
//     rotate(-angle);
//     branch(len * 0.67);
//     pop();
//   }
// }
