import React, { useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { evaluate } from 'mathjs';
import Plot from 'react-plotly.js';
import { calculateOnePointIteration } from './Calonepoint';

const OnePointIterationMethod = () => {
  const [equation, setEquation] = useState('1/4+x/2');
  const [initialGuess, setInitialGuess] = useState(2);
  const [error, setError] = useState(0.0001);
  const [points, setPoints] = useState([]);

  const cal = () =>{
    const {newPointss,xnew} = calculateOnePointIteration(initialGuess,error,equation)
    setPoints(newPointss);
    
  }
  // const calculateOnePointIteration = () => {
  //   let newPoints = [];
  //   let x = initialGuess;
  //   let xNew, fX;
  //   let iteration = 0;
  //   const maxIterations = 50;

  //   do {
  //     fX = evaluate(equation, { x: x });
  //     xNew = x - fX;
  //     newPoints.push({ x: x, fX: fX, xNew: xNew });
  //     x = xNew;
  //     iteration++;
  //   } while (Math.abs(fX) > error && iteration < maxIterations);

  //   setPoints(newPoints);
  // };

  const trueAnswer = points.length > 0 ? points[points.length - 1].xNew : '';

  return (
    <Container>
      <h1>One Point Iteration Method</h1>
      <Form>
        <Form.Group>
          <Form.Label>Equation</Form.Label>
          <Form.Control
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
          />
          <Form.Label>Initial Guess</Form.Label>
          <Form.Control
            type="number"
            value={initialGuess}
            onChange={(e) => setInitialGuess(parseFloat(e.target.value))}
          />
          <Form.Label>Error</Form.Label>
          <Form.Control
            type="number"
            value={error}
            onChange={(e) => setError(parseFloat(e.target.value))}
          />
        </Form.Group>
        <Button onClick={cal}>Calculate</Button>
      </Form>

      <h2>Answer: {trueAnswer !== '' ? trueAnswer.toFixed(4) : ''}</h2>

      <Plot
        data={[
          {
            x: points.map((point, index) => index + 1),
            y: points.map((point) => point.x),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'x',
            marker: { color: 'red' },
          },
        ]}
        layout={{
          width: 800,
          height: 400,
          title: 'Convergence of One Point Iteration Method',
          xaxis: { title: 'Iteration' },
          yaxis: { title: 'x' },
        }}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Iteration</th>
            <th>x</th>
            <th>f(x)</th>        
            <th>xNew</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{point.x.toFixed(4)}</td>
              <td>{point.fX.toFixed(4)}</td>
              <td>{point.xNew.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    );
  };
  
  export default OnePointIterationMethod;

