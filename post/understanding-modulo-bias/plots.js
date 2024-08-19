function generateModuloBiasPlotData(M, k) {
  var targets = Array(k);
  var counts = Array(k);

  for (var i = 0; i < k; i++) {
    targets[i] = i;
    counts[i] = 0;
  }

  for (var i = 0; i < M; i++) {
    counts[i % k] += 1;
  }

  for (var i = 0; i < k; i++) {
    counts[i] /= M;
  }

  return {
    targets: targets, counts: counts
  }
}

function readModuloBiasPlotData() {
  var M = document.getElementById('modulo-bias-M').valueAsNumber;
  var k = document.getElementById('modulo-bias-k').valueAsNumber;

  if (k <= 1 || M <= 1 || k > M) {
    console.log('Invalid values');
    console.log(k);
    console.log(M);
    return null;
  }

  return generateModuloBiasPlotData(M, k);
}

function redrawModuloBiasPlot() {
  var data = readModuloBiasPlotData();

  if (data != null) {
    Plotly.restyle('modulo-bias-plot', 'x', [data.targets]);
    Plotly.restyle('modulo-bias-plot', 'y', [data.counts]);
  }

  return false;
}

function drawModuloBiasPlot() {
  var data = readModuloBiasPlotData();

  if (data) {
    var plotData = [{ x: data.targets, y: data.counts, type: 'bar' }];
    var layout = {
      title: 'Histogram for randomNumber',
      xaxis: { title: 'randomNumber' },
      yaxis: { title: 'Probability' },
      width: 400,
      height: 400
    };

    Plotly.newPlot('modulo-bias-plot', plotData, layout);
  }
}

function generateModuloDistributionPlotData(M) {
  var targets = Array(M - 1);
  var values = Array(M - 1);

  for (var k = 1; k < M; k++) {
    var value = 0.0;
    for (var i = 0; i < k; i++) {
      value += Math.log2((k / M) * Math.ceil((M - i) / k));
    }
    value = -(value / k);

    targets[k - 1] = k;
    values[k - 1] = value;
  }

  return { targets: targets, values: values };
}

function readModuloDistributionPlotData() {
  var M = document.getElementById('modulo-distribution-M').valueAsNumber;

  if (M <= 1) {
    console.log('Invalid values');
    console.log(M);
    return null;
  }

  return generateModuloDistributionPlotData(M);
}

function redrawModuloDistributionPlot() {
  var data = readModuloDistributionPlotData();

  if (data != null) {
    Plotly.restyle('modulo-distribution-plot', 'x', [data.targets]);
    Plotly.restyle('modulo-distribution-plot', 'y', [data.values]);
  }

  return false;
}


function drawModuloDistributionPlot() {
  var data = readModuloDistributionPlotData();

  if (data) {
    var plotData = [{ x: data.targets, y: data.values, type: 'scatter' }];
    var layout = {
      xaxis: { title: 'k' },
      yaxis: { title: 'KL(Z||Y)' },
      width: 400,
      height: 400
    };

    Plotly.newPlot('modulo-distribution-plot', plotData, layout);
  }
}


function generateModuloExpectationPlotData(M) {
  var targets = Array(M - 1);
  var values = Array(M - 1);

  for (var k = 1; k < M; k++) {
    var value = 1.0 / (1.0 - ((M % k) / M));

    targets[k - 1] = k;
    values[k - 1] = value;
  }

  return { targets: targets, values: values };
}

function readModuloExpectationPlotData() {
  var M = document.getElementById('modulo-expectation-M').valueAsNumber;

  if (M <= 1) {
    console.log('Invalid values');
    console.log(M);
    return null;
  }

  return generateModuloExpectationPlotData(M);
}

function redrawModuloExpectationPlot() {
  var data = readModuloExpectationPlotData();

  if (data != null) {
    Plotly.restyle('modulo-expectation-plot', 'x', [data.targets]);
    Plotly.restyle('modulo-expectation-plot', 'y', [data.values]);
  }

  return false;
}

function drawModuloExpectationPlot() {
  var data = readModuloExpectationPlotData();

  if (data) {
    var plotData = [{ x: data.targets, y: data.values, type: 'scatter' }];
    var layout = {
      title: 'Expected iterations as a function of k',
      xaxis: { title: 'k' },
      yaxis: { title: 'E[N]' },
      height: 400,
      width: 400,
    };

    Plotly.newPlot('modulo-expectation-plot', plotData, layout);
  }
}

function generateModuloCDFPlotData(M) {
  var targets = Array(M - 1);
  var values = Array(M - 1);

  for (var k = 1; k < M; k++) {
    var value = Math.floor(M / k) * (k / M);

    targets[k - 1] = k;
    values[k - 1] = value;
  }

  return { targets: targets, values: values };
}

function readModuloCDFPlotData() {
  var M = document.getElementById('modulo-cdf-M').valueAsNumber;

  if (M <= 1) {
    console.log('Invalid values');
    console.log(M);
    return null;
  }

  return generateModuloCDFPlotData(M);
}

function redrawModuloCDFPlot() {
  var data = readModuloCDFPlotData();

  if (data != null) {
    Plotly.restyle('modulo-cdf-plot', 'x', [data.targets]);
    Plotly.restyle('modulo-cdf-plot', 'y', [data.values]);
  }

  return false;
}

function drawModuloCDFPlot() {
  var data = readModuloCDFPlotData();

  if (data) {
    var plotData = [{ x: data.targets, y: data.values, type: 'scatter' }];
    var layout = {
      title: 'Second term as a function of k',
      xaxis: { title: 'k' },
      yaxis: { title: 'Second Term' },
      width: 400,
      height: 400,
    };

    Plotly.newPlot('modulo-cdf-plot', plotData, layout);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  drawModuloDistributionPlot();
  drawModuloExpectationPlot();
  drawModuloBiasPlot();
  drawModuloCDFPlot();

  document.getElementById('modulo-bias-M')
    .addEventListener('change', redrawModuloBiasPlot);
  document.getElementById('modulo-bias-k')
    .addEventListener('change', redrawModuloBiasPlot);

  document.getElementById('modulo-distribution-M')
    .addEventListener('change', redrawModuloDistributionPlot);

  document.getElementById('modulo-expectation-M')
    .addEventListener('change', redrawModuloExpectationPlot);

  document.getElementById('modulo-cdf-M')
    .addEventListener('change', redrawModuloCDFPlot);
});