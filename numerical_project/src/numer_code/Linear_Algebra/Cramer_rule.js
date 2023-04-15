import React, { useState } from 'react';
import { Button, Container, Form, Table, Row, Col } from 'react-bootstrap';


const determinant = (matrix) => {
  const [a, b, c] = matrix;
  return a[0] * (b[1] * c[2] - c[1] * b[2]) - a[1] * (b[0] * c[2] - c[0] * b[2]) + a[2] * (b[0] * c[1] - c[0] * b[1]);
};

const cramerRule = (matrixA, matrixB) => {
  const detA = determinant(matrixA);

  if (detA === 0) {
    console.log("Error")
    throw new Error('Det A Cannot be 0');
  }

  const matrixAx = matrixA.map((row, rowIndex) => [...row.slice(0, 0), matrixB[rowIndex], ...row.slice(1)]);
  const matrixAy = matrixA.map((row, rowIndex) => [...row.slice(0, 1), matrixB[rowIndex], ...row.slice(2)]);
  const matrixAz = matrixA.map((row, rowIndex) => [...row.slice(0, 2), matrixB[rowIndex], ...row.slice(3)]);

  const detAx = determinant(matrixAx);
  const detAy = determinant(matrixAy);
  const detAz = determinant(matrixAz);

  const x = detAx / detA;
  const y = detAy / detA;
  const z = detAz / detA;

  return [x, y, z];
};

const CramerRule = () => {
  const [matrixA, setMatrixA] = useState([
    [3, 1, 1],
    [2, 2, 5],
    [1, -3, -4]
  ]);
  const [matrixB, setMatrixB] = useState([3, -1, 2]);
  const [result, setResult] = useState([]);

  const handleMatrixAChange = (e, rowIndex, colIndex) => {
    const newMatrixA = [...matrixA];
    newMatrixA[rowIndex][colIndex] = parseFloat(e.target.value) || 0;
    setMatrixA(newMatrixA);
  };

  const handleMatrixBChange = (e, rowIndex) => {
    const newMatrixB = [...matrixB];
    newMatrixB[rowIndex] = parseFloat(e.target.value) || 0;
    setMatrixB(newMatrixB);
  };

  const calculateCramerRule = () => {
    try {
      const result = cramerRule(matrixA, matrixB);
      setResult(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <h1>Cramer's Rule Calculator</h1>
      <Form>
        <h3>Matrix A:</h3>
        {matrixA.map((row, rowIndex) => (
          <Form.Group as={Row} key={rowIndex}>
            {row.map((value, colIndex) => (
              <Col xs={4} md={4} lg={4} key={colIndex}>
                <Form.Control
                  type="number"
                  value={value}
                  onChange={(e) => handleMatrixAChange(e, rowIndex, colIndex)}
                />
              </Col>
            ))}
          </Form.Group>
        ))}

        <h3>Matrix B:</h3>
        {matrixB.map((value, rowIndex) => (
          <Form.Group key={rowIndex}>
            <Form.Control
              type="number"
              value={value}
              onChange={(e) => handleMatrixBChange(e, rowIndex)}
            />
          </Form.Group>
        ))}

        <Button onClick={calculateCramerRule}>Calculate</Button>
      </Form>
      <h2>
        Result:{' '}
        {result.length > 0
          ? `x=${result[0].toFixed(4)}, y=${result[1].toFixed(
              4,
            )}, z=${result[2].toFixed(4)}`
          : ''}
      </h2>
    </Container>
  );
};

export default CramerRule;


