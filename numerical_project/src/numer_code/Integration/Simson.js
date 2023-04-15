import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { evaluate, compile } from 'mathjs';

const Simpsons = () => {
  const [equation, setEquation] = useState('x * sin(x)');
  const [a, setA] = useState(0);
  const [b, setB] = useState(3.141592653589793);
  const [n, setN] = useState(8);
  const [result, setResult] = useState(null);

  const handleChangeEquation = (e) => {
    setEquation(e.target.value);
  };

  const handleChangeA = (e) => {
    setA(parseFloat(e.target.value));
  };

  const handleChangeB = (e) => {
    setB(parseFloat(e.target.value));
  };

  const handleChangeN = (e) => {
    setN(parseInt(e.target.value));
  };

  const calculateSimpsons = () => {
    if (n % 2 !== 0) {
      alert('n must be an even number.');
      return;
    }

    const fn = compile(equation);
    const h = (b - a) / n;
    let sum = fn.evaluate({ x: a }) + fn.evaluate({ x: b });

    for (let i = 1; i < n; i++) {
      const x = a + i * h;
      sum += (i % 2 === 0 ? 2 : 4) * fn.evaluate({ x });
    }

    setResult((h / 3) * sum);
  };

  return (
    <Container>
        <h1>Simpson Rule</h1>
      <Form>
        <Form.Group>
          <Form.Label>Function f(x):</Form.Label>
          <Form.Control type="text" value={equation} onChange={handleChangeEquation} />
          <Form.Label>a:</Form.Label>
          <Form.Control type="number" value={a} onChange={handleChangeA} />
          <Form.Label>b:</Form.Label>
          <Form.Control type="number" value={b} onChange={handleChangeB} />
          <Form.Label>n:</Form.Label>
          <Form.Control type="number" value={n} onChange={handleChangeN} />
        </Form.Group>
        <Button variant="primary" onClick={calculateSimpsons}>
          Calculate
        </Button>
      </Form>
      {result !== null && (
        <div>
          <h3>Result</h3>
          <p>{result}</p>
        </div>
      )}
    </Container>
  );
};

export default Simpsons;
