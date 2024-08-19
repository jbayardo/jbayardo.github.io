function distributeBuckets(N) {
  const numBuckets = Math.floor(Math.log2(N - 1)) + 1;
  let buckets = [];
  let sumPrevious = 1;

  for (let i = 0; i < numBuckets; i++) {
    let acquire = 2 ** i;
    let wait = N - (sumPrevious + acquire);
    buckets.push({
      alreadyHave: sumPrevious,
      acquire: acquire,
      wait: wait
    });
    sumPrevious += acquire;
  }

  if (sumPrevious > N) {
    buckets[buckets.length - 1].acquire -= sumPrevious - N;
    buckets[buckets.length - 1].wait = 0;
  }

  return buckets;
}

function plotBuckets(buckets) {
  const trace1 = {
    x: buckets.map((_, index) => `${index}`),
    y: buckets.map(bucket => bucket.alreadyHave),
    name: 'Has',
    type: 'bar'
  };

  const trace2 = {
    x: buckets.map((_, index) => `${index}`),
    y: buckets.map(bucket => bucket.acquire),
    name: 'Download',
    type: 'bar'
  };

  const trace3 = {
    x: buckets.map((_, index) => `${index}`),
    y: buckets.map(bucket => bucket.wait),
    name: 'Wait',
    type: 'bar'
  };

  const data = [trace1, trace2, trace3];

  const layout = {
    title: 'Distribution of N = 1000 downloads among buckets',
    barmode: 'stack',
    xaxis: { title: 'Time' },
    yaxis: { title: 'Machines' }
  };

  Plotly.newPlot('distribution-plot', data, layout);
}

function plotPdfAndCdf(B) {
  const q = 1 / (math.pow(2, B) - 1);

  function pdf(i) {
    return math.pow(2, i) * q;
  }

  function cdf(x) {
    return (math.pow(2, x + 1) - 1) * q;
  }

  const xValues = [...Array(B).keys()];
  const pdfValues = xValues.map(i => pdf(i));
  const cdfValues = xValues.map(x => cdf(x));

  const trace1 = {
    x: xValues,
    y: pdfValues,
    type: 'bar',
    name: 'PDF'
  };

  const trace2 = {
    x: xValues,
    y: cdfValues,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'CDF'
  };

  const layout1 = {
    title: 'PDF and CDF',
    barmode: 'group',
    xaxis: {
      title: 'Bucket Number'
    },
    yaxis: {
      title: 'Probability'
    }
  };

  const data1 = [trace1, trace2];

  Plotly.newPlot('pdf-plot', data1, layout1);
}

document.addEventListener('DOMContentLoaded', () => {
  const N = 1000;
  const buckets = distributeBuckets(N);
  plotBuckets(buckets);
  plotPdfAndCdf(buckets.length);
});
