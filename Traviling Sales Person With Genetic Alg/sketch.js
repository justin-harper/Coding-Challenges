
var cities = [];
var totalCities = 20;
var recordDistance = Infinity;
var bestEver = [];
var population = [];
var fitness = [];
var popSize  = 500;

function setup()
{
  createCanvas(600, 600);
  var order = [];
  for(var i = 0; i < totalCities; i++)
  {
    cities.push(createVector(random(width), random(height)));
    order.push(i);
  }

  for(var i = 0; i < popSize; i++)
  {
    population[i] = shuffle(order)
  }
}

function draw()
{
  background(51);
  calclateFitness();
  normalizeFitness();
  nextGeneration();

  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for(var i = 0; i < bestEver.length; i++)
  {
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();
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
