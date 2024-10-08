function generateCosineSimilarityData(
  n_i, p_i, start, end, resolution, delta_normed = false) {
  xs = [];
  ys = [];
  zs = [];
  for (var x = start; x < end; x += resolution) {
    for (var y = start; y < end; y += resolution) {
      xs.push(x);
      ys.push(y);

      var p = math.matrix([x, y]);
      if (math.deepEqual(p_i, p)) {
        // Skip the center point.
        continue;
      }

      var delta = math.subtract(p, p_i);
      var normalized_delta = math.divide(delta, math.norm(delta));
      var similarity = math.dot(n_i, normalized_delta);
      if (delta_normed) {
        similarity = math.divide(similarity, math.norm(delta));
      }

      zs.push(similarity);
    }
  }

  return {
    xs: xs, ys: ys, zs: zs
  }
}

function drawCosineSimilarityHeatmap(identifier, delta_normed) {
  var n_i = math.matrix([1, 0]);
  n_i = math.divide(n_i, math.norm(n_i));

  var p_i = math.matrix([1, 1]);

  var start = 0;
  var end = 2;
  var resolution = 0.01;

  var data = generateCosineSimilarityData(n_i, p_i, start, end, resolution, delta_normed);

  var title = 'Cosine Similarity';
  if (delta_normed) {
    title = 'Rho Estimate';
  }

  var plotData = [{
    x: data.xs,
    y: data.ys,
    z: data.zs,
    type: 'heatmap',
    zmin: delta_normed ? -10 : -1,
    zmax: delta_normed ? 10 : 1,
  }];

  var layout = {
    title: title,
    xaxis: {
      range: [start, end],
      autorange: false
    },
    yaxis: {
      range: [start, end],
      autorange: false
    },
    width: 400,
    height: 400
  };

  Plotly.newPlot(identifier, plotData, layout);
}

document.addEventListener('DOMContentLoaded', () => {
  drawCosineSimilarityHeatmap('rho-component-plot', true);
  drawCosineSimilarityHeatmap('cosine-similarity-plot', false);
});