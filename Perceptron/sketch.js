var training = new Array(2000);

var p;
var count = 0;

var minX = -1;
var maxX = 1;
var minY = -1;
var maxY = 1;

function f(x){
  return 0.3 * x + 0.4;
}

function setup()
{
  createCanvas(400, 400);
  p = new Precptron(3, 0.001);

  for(var i = 0; i < training.length; i++){
    var x = random(minX, maxX);
    var y = random(minY, maxY);
    var a = 1;

    if(y < f(x))
    {
      a = -1;
    }
    training[i] = {
      input: [x, y, 1],
      output: a
    };
  }
}

function draw(){
  background(51);
  strokeWeight(1);
  stroke(255);
  var x1 = map(minX, minX, maxX, 0, width);
  var y1 = map(f(minX), minY, maxY, height, 0);
  var x2 = map(maxX, minX, maxX, 0, width);
  var y2 = map(f(maxX), minY, maxY, height, 0);

  line(x1, y1, x2, y2);

  stroke(255);
  strokeWeight(2);

  var w = p.weights;
  var x1 = minX;
  var y1 = (-w[2] - w[0] * x1) / w[1];
  var x2 = maxX;
  var y2 = (-w[2] - w[0] * x2) / w[1];

  var x1 = map(x1, minX, maxX, 0, width);
  var y1 = map(y1, minY, maxY, height, 0);
  var x2 = map(x2, minX, maxX, 0, width);
  var y2 = map(y2, minY, maxY, height, 0);
  line(x1, y1, x2, y2);

  p.train(training[count].input, training[count].output);
  count = (count + 1) % training.length;

  for(var i = 0; i < count; i++){
    stroke(255);
    strokeWeight(1);
    fill(255);
    var guess = p.feed(training[i].input)
    

      if(guess > 0){
        noFill();
      }

      var x = map(training[i].input[0], minX, maxX, 0, width);
      var y = map(training[i].input[1], minY, maxY, height, 0);
      ellipse(x, y, 8, 8);

  }
}
