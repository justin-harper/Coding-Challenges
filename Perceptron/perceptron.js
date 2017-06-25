function Precptron(length, learningRate){
  this.weights = new Array(length);
  this.learningRate = learningRate;

  for(var i = 0; i < this.weights.length; i++)  {
    this.weights[i] = random(-1, 1);
  }
}

Precptron.prototype.train = function (input, d) {
  var guess = this.feed(input);
  var error = d - guess;

  for(var i = 0; i < input.length; i++){
    this.weights[i] += this.learningRate * error * input[i];
  }
};

Precptron.prototype.feed = function (input) {
  var sum = 0;
  for(var i = 0; i < input.length; i++){
    sum += input[i] * this.weights[i];
  }

  return this.activate(sum);
};

Precptron.prototype.activate = function (sum) {
  if(sum > 0){
    return 1;
  }
  else{
    return -1;
  }
};
