

var order = [];
var cities = [];

var totalCities = 5;
var recordDistance = Infinity;
var bestEver;
var count = 0;

var totalPerm = fact(totalCities);

function fact(val)
{
  if(val == 1)
  {
    return 1;
  }
  else
  {
    return val * fact(val -1);
  }
}

function setup()
{
  createCanvas(400, 400);
  frameRate(5);

  for(var i = 0; i < totalCities; i++)
  {
    cities.push(createVector(random(width), random(height)));
    order.push(i);
  }
}

function nextOrder()
{
  //Step 1
  var largestI = -1;
  for(var i = 0; i < order.length -1; i++)
  {
    if(order[i] < order[i+1])
    {
      largestI = i;
    }
  }

  if(largestI === -1)
  {
    noLoop();
    console.log("finished");
  }
  //Step 2
  var largestJ = -1;
  for(var j = 0; j < order.length; j++)
  {
    if(order[largestI] < order[j])
    {
      largestJ = j;
    }
  }
  //Step 3
  swap(order, largestI, largestJ);

  //Step 4
  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
  count++;
}

function draw()
{
  background(51);
  drawCities();
  var d = calculateDistance(cities, order);

  if(d < recordDistance)
  {
    recordDistance = d;
    bestEver = order.slice();
  }

  drawBestEver();
  drawOrder();
}

function drawCities()
{
  fill(255);
  for(var city of cities)
  {
    ellipse(city.x, city.y, 8, 8);
  }

  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for(var i = 0; i < order.length; i++)
  {
    var n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();
}

function drawBestEver()
{
  strokeWeight(5);
  stroke(255,0,255);
  noFill();
  beginShape();
  for(var c = 0; c < bestEver.length; c++)
  {
    var i = bestEver[c];
    vertex(cities[i].x, cities[i].y);
  }
  endShape();
}

function drawOrder()
{
  textSize(64);
  var percent = 100 * (count / totalPerm);
  //
  // var s = "";
  // for(var i of order)
  // {
  //   s += i;
  // }
  fill(255);
  text(nf(percent, 0, 2) + "%", 20, height-20);
  nextOrder();
}

function swap(a, i, j)
{
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calculateDistance(pts, order)
{
  var sum = 0;
  for(var p = 0; p < pts.length-1; p++)
  {
    var cityA = pts[order[p]];
    var cityB = pts[order[p+1]]
    sum += dist(cityA.x, cityA.y, cityB.x, cityB.y)
  }
  return sum;
}
