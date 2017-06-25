function calclateFitness()
{
  for(var i = 0; i < population.length; i++)
  {
    var d = calculateDistance(cities, population[i]);
    if(d < recordDistance)
    {
      recordDistance = d;
      bestEver = population[i];
    }
    fitness[i] = 1/(d +1);
  }
}

function normalizeFitness()
{
  var sum = 0;
  for (var i = 0; i < fitness.length; i++)
  {
    sum += fitness[i];
  }
  for(var i = 0; i< fitness.length; i++)
  {
    fitness[i] = fitness[i] / sum;
  }
}

function nextGeneration()
{
  var newPop = [];

  for(var i = 0; i < population.length; i++)
  {
    var orderA = pickOne(population, fitness);
    var orderB = pickOne(population, fitness);
    var order = crossOver(orderA, orderB);
    mutate(order, 0.25);
    newPop[i] = order;
  }
  population = newPop;
}

function pickOne(list, prob)
{
  var index = 0;
  var r = random(1);
  while(r > 0)
  {
    r = r -prob[index];;
    index++;
  }
  index--;
  return list[index].slice();
}

function mutate(order, rate)
{
  for(var i = 0; i < totalCities; i++)
  {
    if(random(1) < rate);
    {
      var indexA = floor(random(order.length));
      var indexB = (indexA + 1) % totalCities


      swap(order, indexA, indexB);
    }
  }
}

function crossOver(A, B)
{
  var start = floor(random(A.length));
  var end = floor(random(start + 1, A.length));
  var newOrder = A.slice(start, end);

  for(var i = 0; i < B.length; i++)
  {
    var city = B[i];
    if(!newOrder.includes(city))
    {
      newOrder.push(city);
    }
  }

  return newOrder;
}
