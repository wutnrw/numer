import React, { useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { evaluate } from 'mathjs';
import Plot from 'react-plotly.js';
import axios from 'axios';

const BisectionMethod4 = () => {
  const [equation, setEquation] = useState('');
  const [Xl, setXl] = useState(0);
  const [Xr, setXr] = useState(2);
  const [error, setError] = useState(0.0001);
  const [points, setPoints] = useState([]);

  const isTrueAnswerEqualToInterval = (answer, intervalXl, intervalXr) => {
    const tolerance = error;
    return Math.abs(answer - intervalXl) < tolerance || Math.abs(answer - intervalXr) < tolerance; 
  };//มีเพื่อเช็คว่า ถ้าค่ามันเท่ากับ xl xr คือผิด แล้วไปเขียนฟังชั่นอีกที

  const calculateBisection = () => {
    let newPoints = [];
    let XlTemp = Xl;
    let XrTemp = Xr;
    let Xm, fXl, fXr, fXm;

    while (Math.abs(XrTemp - XlTemp) > error) {
      Xm = (XlTemp + XrTemp) / 2;
      fXl = evaluate(equation, { x: XlTemp });
      fXr = evaluate(equation, { x: XrTemp });
      fXm = evaluate(equation, { x: Xm });

      if (fXl * fXm < 0) {
        XrTemp = Xm;
      } else {
        XlTemp = Xm;
      }

      newPoints.push({ x: XlTemp, y: XrTemp, Xm: Xm });
    }
    setPoints(newPoints);
  };

  const trueAnswer = points.length > 0 ? points[points.length - 1].Xm : '';

  const Random = () =>{
    console.log(token)
    console.log("R");
    try{
      axios.get('http://localhost:9000/getequa',{headers:{Authorization:`a ${token}`}}).then((res)=>{
        console.log(res.data);
        let ran = Math.floor(Math.random()*res.data.length)
        setEquation(res.data[ran].Equa);
      })

    }catch(err){
      console.log(err);
    }

  }
  const [token,settoken] = useState()
  const gettoken = () =>{
    try{
      let name = document.getElementById("name").value
      console.log(name);
      axios.get(`http://localhost:9000/gettoken/${name}`).then((res)=>{
        settoken(res.data);
      })

    }catch(err){
      console.log(err);
    }
  }

  // const getTrueAnswer = (points) => {
  //   if (points.length > 0) {
  //     return points[points.length - 1].c;
  //   } else {
  //     return '';
  //   }
  // };

  // const getTrueAnswer = () => {
  //   if (points.length > 0) {
  //     const lastPoint = points[points.length - 1];
  //     if (lastPoint.c >= a && lastPoint.c <= b) {
  //       return lastPoint.c.toFixed(4);
  //     } else {
  //       return 'error';
  //     }
  //   } else {
  //     return '';
  //   }
  // };

  return (
    <Container>
      <h1>Bisection Method</h1>
      <Form>
        <Form.Group>
        <Form.Label>Get token</Form.Label>
          <Form.Control
            type="text"
            id="name"
          />
          <Button onClick={gettoken}>Get token</Button>
          <br></br>
          <Form.Label>Equation</Form.Label>
          <Form.Control
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)} //เก็บค่าแบบบรรทัดเดียว ไม่ต้องเขียนแยก
          />
          <Form.Label>Interval A</Form.Label>
          <Form.Control
            type="number"
            value={Xl}
            onChange={(e) => setXl(parseFloat(e.target.value))}
          />
          <Form.Label>Interval B</Form.Label>
          <Form.Control
            type="number"
            value={Xr}
            onChange={(e) => setXr(parseFloat(e.target.value))}
          />
          <Form.Label>Error</Form.Label>
          <Form.Control
            type="number"
            value={error}
            onChange={(e) => setError(parseFloat(e.target.value))}
          />
        </Form.Group>
        <Button onClick={calculateBisection}>Calculate</Button>
        <Button onClick={Random}>Random</Button>
      </Form>

      
      <h2>Answer: {trueAnswer !== '' && !isTrueAnswerEqualToInterval(trueAnswer, Xl, Xr) ? trueAnswer.toFixed(4) : 'error'}</h2>
      {/* // เปรียบเทียบคำตอบที่ได้จากการคำนวณกับช่วง [a, b] ว่าอยู่ในช่วงเหมือนกันหรือไม่ หากไม่อยู่ในช่วงเดียวกันจะแสดงคำว่า "error" แต่ถ้าอยู่ในช่วงเดียวกันจะแสดงคำตอบที่ถูกต้องจนถึง 4 ตำแหน่งทศนิยม */}
      
      <Plot
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
            title: 'Convergence of Bisection Method',
            xaxis: { title: 'Iteration' },
            yaxis: { title: 'x' },
          }}
            />
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
export default BisectionMethod4;



   


