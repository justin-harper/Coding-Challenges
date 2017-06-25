var maxIterations = 100;

var minVal = -0.5;
var maxVal = 0.5;

var minslider;
var maxslider;

function setup()
{
  createCanvas(400, 400);
  pixelDensity(1);

  minslider = createSlider(-2.5, 0, -2.5, 0.01);
  maxslider = createSlider(0, 2.5, 2.5, 0.01);

}

function draw()
{
  loadPixels();

  for(var x = 0; x < width; x++)
  {
    for(var y = 0; y < height; y++)
    {
      var a = map(x, 0, width, minslider.value(), maxslider.value());
      var b = map(y, 0, height, minslider.value(), maxslider.value());

      var ca = a;
      var cb = b;

      var n = 0;
      var z = 0;

      while(n < maxIterations)
      {
        var aa = a * a - b * b;
        var bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;

        if(abs(a + b) > 16)
        {
          break;
        }
        n++;
      }
      var bright = map(n, 0, maxIterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);
      if(n === maxIterations)
      {
        bright = 0;
      }


      var pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}
