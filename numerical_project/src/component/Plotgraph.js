import React from 'react';
import Plot from 'react-plotly.js';

const PlotGraph = ({ data }) => {
  const trace = {
    x: data.map((item) => item.iteration),
    y: data.map((item) => item.error),
    mode: 'lines+markers',
    type: 'scatter',
    name: 'Error',
  };

  const layout = {
    title: 'Error vs Iterations',
    xaxis: {
      title: 'Iterations',
    },
    yaxis: {
      title: 'Error (%)',
    },
  };

  return (
    <Plot
      data={[trace]}
      layout={layout}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default PlotGraph;
