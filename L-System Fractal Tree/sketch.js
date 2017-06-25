// var axiom = "A";
// var sentance = axiom;
// var rules =
// [
//   {
//     input: "A",
//     output: "ABC"
//   },
//   {
//     input: "B",
//     output: "A"
//   }
// ]

// F: Forward
// +: Turn Right
// -: Turn Left
// [: Save
// ]: Restore

var len = 100;
var angle;
var axiom = "F";
var sentance = axiom;
var rules =
[
  {
    input: "F",
    output: "FF+[+F-F-F]-[-F+F+F]"
  }
]

function generate()
{
  len *= 0.5
  var nextSentance = "";
  for(var i of sentance)
  {
    var match = false;
    for(j of rules)
    {
      if(i === j.input)
      {
        nextSentance += j.output;
        match = true;
        break;
      }
    }
    if(match === false)
    {
      nextSentance += i;
    }
  }
  sentance = nextSentance;
  //createP(sentance);
  turtleGraphics(sentance);
}

function turtleGraphics()
{
  background(51);
  resetMatrix();
  translate(width / 2, height);
  stroke(255, 100);

  for(var i of sentance)
  {
    switch(i)
    {
      case "F": line(0, 0, 0, -len); translate(0, -len); break;
      case "+": rotate(angle);     break;
      case "-": rotate(-angle);    break;
      case "[": push();           break;
      case "]": pop();            break;
    }
  }
}

function setup()
{
  createCanvas(400,400);
  background(51);

  angle = radians(25);
  //translate(width/2, height);
  //createP(axiom);
  turtleGraphics();
  var button = createButton("Generate");
  button.mousePressed(generate);
}

function draw()
{

}
