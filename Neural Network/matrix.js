function Matrix(rows, cols) {
  this.rows = rows;
  this.cols = cols;

  this.matrix = [];

  for (var i = 0; i < this.rows; i++) {
    this.matrix[i] = [];
    for (var j = 0; j < this.cols; j++) {
      this.matrix[i][j] = 0;
    }
  }
}

Matrix.prototype.multiply = function(n) {
  if (n instanceof Matrix) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= n.matrix[i][j];
      }
    }
  }
  else {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= n;
      }
    }
  }
};

Matrix.prototype.add = function(n) {
  if (n instanceof Matrix) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] += n.matrix[i][j];
      }
    }
  }
  else {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] += n;
      }
    }
  }
};

Matrix.prototype.randomize = function() {
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      this.matrix[i][j] = Math.floor(Math.random() * 10);
    }
  }
};

Matrix.prototype.dot = function(n)
{
  var result = 0;
  if(n instanceof Matrix)
  {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        var mij = this.matrix[i][j];
        var nij = n.matrix[i][j];
        result += (mij * nij);
      }
    }
  }
  return result;
};


Matrix.prototype.test = function()
{
  var m = new Matrix(3,3);
  var n = new Matrix(3,3);

  m.randomize();
  n.randomize();

  console.table(m.matrix);
  console.table(n.matrix);
  var d = m.dot(n);
  var d2 = n.dot(m);

  console.log("m dot result: ", d);
  console.log("n dot result: ", d2);
};
