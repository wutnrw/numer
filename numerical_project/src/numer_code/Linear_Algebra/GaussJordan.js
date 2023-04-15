import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';

const gaussJordan = (matrixA, matrixB) => {
  let combinedMatrix = matrixA.map((row, rowIndex) => [...row, matrixB[rowIndex]]);

  for (let i = 0; i < combinedMatrix.length; i++) {
    let maxIndex = i;
    for (let j = i + 1; j < combinedMatrix.length; j++) {
      if (Math.abs(combinedMatrix[j][i]) > Math.abs(combinedMatrix[maxIndex][i])) {
        maxIndex = j;
      }
    }
    [combinedMatrix[i], combinedMatrix[maxIndex]] = [combinedMatrix[maxIndex], combinedMatrix[i]];

    for (let j = i + 1; j < combinedMatrix.length; j++) {
      const factor = combinedMatrix[j][i] / combinedMatrix[i][i];
      for (let k = i; k < combinedMatrix[0].length; k++) {
        combinedMatrix[j][k] -= factor * combinedMatrix[i][k];
      }
    }
  }

  for (let i = combinedMatrix.length - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < combinedMatrix[0].length - 1; j++) {
      sum += combinedMatrix[i][j] * combinedMatrix[j][combinedMatrix[0].length - 1];
    }
    combinedMatrix[i][combinedMatrix[0].length - 1] = (combinedMatrix[i][combinedMatrix[0].length - 1] - sum) / combinedMatrix[i][i];
  }

  return combinedMatrix.map(row => row[row.length - 1]);
};

const GaussJordan = () => {
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

  const calculateGaussJordan = () => {
    try {
      const result = gaussJordan(matrixA, matrixB);
      setResult(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <h1>Gauss-Jordan Elimination Calculator</h1>
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

        <Button onClick={calculateGaussJordan}>Calculate</Button>
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

export default GaussJordan;

