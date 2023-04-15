import React, { useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { evaluate } from 'mathjs';
// import Plot from 'react-plotly.js';

const FalsePositionMethod1 = () => {
  const [equation, setEquation] = useState('(x^4)-13');
  const [Xl, setXl] = useState(0);
  const [Xr, setXr] = useState(2);
  const [error, setError] = useState(0.0001);
  const [points, setPoints] = useState([]);

  const isTrueAnswerEqualToInterval = (answer, intervalXl, intervalXr) => {
    const tolerance = error;
    return Math.abs(answer - intervalXl) < tolerance || Math.abs(answer - intervalXr) < tolerance; 
  };

  const calculateFalsePosition = () => {
    let newPoints = [];
    let XlTemp = Xl;
    let XrTemp = Xr;
    let Xm, fXl, fXr, fXm;
    const maxIterations = 100; // กำหนดจำนวนรอบการทำงานสูงสุด
  
    let iterations = 0;
    while (Math.abs(XrTemp - XlTemp) > error && iterations < maxIterations) {
      fXl = evaluate(equation, { x: XlTemp });
      fXr = evaluate(equation, { x: XrTemp });
  
      Xm = (XlTemp * fXr - XrTemp * fXl) / (fXr - fXl);
      fXm = evaluate(equation, { x: Xm });
  
      if (fXl * fXm < 0) {
        XrTemp = Xm;
      } else {
        XlTemp = Xm;
      }
  
      newPoints.push({ x: XlTemp, y: XrTemp, Xm: Xm });
      iterations++;
    }
    setPoints(newPoints);
  };

  const trueAnswer = points.length > 0 ? points[points.length - 1].Xm : '';

  return (
    <Container>
      <h1>False Position Method</h1>
      <Form>
        <Form.Group>
          <Form.Label>Equation</Form.Label>
          <Form.Control
            type="text"
            data-testid="Equation"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
          />
          <Form.Label>Interval A</Form.Label>
          <Form.Control
            type="number"
            data-testid="XL"
            value={Xl}
            onChange={(e) => setXl(parseFloat(e.target.value))}
          />
          <Form.Label>Interval B</Form.Label>
          <Form.Control
            type="number"
            data-testid="XR"
            value={Xr}
            onChange={(e) => setXr(parseFloat(e.target.value))}
          />
          <Form.Label>Error</Form.Label>
          <Form.Control
            type="number"
            data-testid="Error"
            value={error}
            onChange={(e) => setError(parseFloat(e.target.value))}
          />
        </Form.Group>
        <Button data-testid="myBtn" onClick={calculateFalsePosition}>Calculate</Button>
      </Form>

      <h2 data-testid="ans">Answer: {trueAnswer !== '' && !isTrueAnswerEqualToInterval(trueAnswer, Xl, Xr) ? trueAnswer.toFixed(4) : 'error'}</h2>

      {/* <Plot
        data={[
          {
            x: points.map((point, index) => index + 1),
            y: points.map((point) => point.x),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Xl',
            marker: { color: 'red' },
          },
          {
            x: points.map((point, index) => index + 1),
            y: points.map((point) => point.y),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Xr',
            marker: { color: 'blue' },
          },
          {
            x: points.map((point, index) => index + 1),
            y: points.map((point) => point.Xm),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Xm',
            marker: { color: 'green' },
          },
        ]}
        layout={{
          width: 800,
          height: 400,
          title: 'Convergence of False Position Method',
          xaxis: { title: 'Iteration' },
          yaxis: { title: 'x' },
        }}
      /> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Iteration</th>
            <th>Xl</th>
            <th>Xr</th>
            <th>Xm</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{point.x.toFixed(4)}</td>
              <td>{point.y.toFixed(4)}</td>
              <td>{point.Xm.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FalsePositionMethod1;

