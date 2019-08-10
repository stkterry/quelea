import React from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import { directive } from '@babel/types';
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

class Falloff extends React.Component {
  render() {
    return (
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines',
            line: {shape: 'spline'}
          }
        ]}
        layout={{ 
          title: 'A Fancy Plot', 
          width: 320, 
          height: 240,
          margin: {l: 30, r: 30, b: 30, t: 30, pad: 10},
          plot_bgcolor: "rgba(0,0,0,0",
          paper_bgcolor: "rgba(0,0,0,0"
        }}
      />
    );
  }
}

export default Falloff;