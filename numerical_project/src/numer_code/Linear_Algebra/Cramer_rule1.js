import React, { useState } from "react";

function CramersRule1() {
  const [a11, setA11] = useState("");
  const [a12, setA12] = useState("");
  const [a13, setA13] = useState("");
  const [a21, setA21] = useState("");
  const [a22, setA22] = useState("");
  const [a23, setA23] = useState("");
  const [a31, setA31] = useState("");
  const [a32, setA32] = useState("");
  const [a33, setA33] = useState("");
  const [b1, setB1] = useState("");
  const [b2, setB2] = useState("");
  const [b3, setB3] = useState("");
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [z, setZ] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function calculateSolution() {
    let a11Num = Number(a11);
    let a12Num = Number(a12);
    let a13Num = Number(a13);
    let a21Num = Number(a21);
    let a22Num = Number(a22);
    let a23Num = Number(a23);
    let a31Num = Number(a31);
    let a32Num = Number(a32);
    let a33Num = Number(a33);
    let b1Num = Number(b1);
    let b2Num = Number(b2);
    let b3Num = Number(b3);

    if (isNaN(a11Num) || isNaN(a12Num) || isNaN(a13Num) || isNaN(a21Num) || isNaN(a22Num) || isNaN(a23Num) || isNaN(a31Num) || isNaN(a32Num) || isNaN(a33Num) || isNaN(b1Num) || isNaN(b2Num) || isNaN(b3Num)) {
      setErrorMessage("Please enter a valid input");
      return;
    }

    let determinantA = a11Num * (a22Num * a33Num - a32Num * a23Num) - a21Num * (a12Num * a33Num - a32Num * a13Num) + a31Num * (a12Num * a23Num - a22Num * a13Num);
    
    if (determinantA === 0) {
      setErrorMessage("The system has no unique solution");
      return;
    }
    
    let determinantX = b1Num * (a22Num * a33Num - a32Num * a23Num) - a21Num * (b2Num * a33Num - a32Num * b3Num) + a31Num * (b2Num * a23Num - a22Num * b3Num);
    let determinantY = a11Num * (b2Num * a33Num - a32Num * b3Num) - b1Num * (a12Num * a33Num - a32Num * a13Num) + a31Num * (a12Num * b3Num - b2Num * a13Num);
    let determinantZ = a11Num * (a22Num * b3Num - b2Num * a23Num) - a21Num * (a12Num * b3Num - b2Num * a13Num) + b1Num * (a12Num * a23Num - a22Num * a13Num);

    let xValue = determinantX / determinantA;
    let yValue = determinantY / determinantA;
    let zValue = determinantZ / determinantA;

    setX(xValue);
    setY(yValue);
    setZ(zValue);
    setErrorMessage(null);

  }

  return (
    <div>
      <h1>Cramer's Rule 3x3</h1>
      <div>
        <label htmlFor="a11">Enter a11:</label>
        <input
          type="number"
          id="a11"
          value={a11}
          onChange={(e) => setA11(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="a12">Enter a12:</label>
        <input
          type="number"
          id="a12"
          value={a12}
          onChange={(e) => setA12(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="a13">Enter a13:</label>
        <input
          type="number"
          id="a13"
          value={a13}
          onChange={(e) => setA13(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="a21">Enter a21:</label>
        <input
          type="number"
          id="a21"
          value={a21}
          onChange={(e) => setA21(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="a22">Enter a22:</label>
        <input
          type="number"
          id="a22"
          value={a22}
          onChange={(e) => setA22(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="a23">Enter a23:</label>
        <input
          type="number"
          id="a23"
          value={a23}
          onChange={(e) => setA23(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="a31">Enter a31:</label>
        <input
          type="number"
          id="a31"
          value={a31}
          onChange={(e) => setA31(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="a32">Enter a32:</label>
        <input
          type="number"
          id="a32"
          value={a32}
          onChange={(e) => setA32(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="a33">Enter a33:</label>
        <input
          type="number"
          id="a33"
          value={a33}
          onChange={(e) => setA33(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="b1">Enter b1:</label>
        <input
          type="number"
          id="b1"
          value={b1}
          onChange={(e) => setB1(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="b2">Enter b2:</label>
        <input
          type="number"
          id="b2"
          value={b2}
          onChange={(e) => setB2(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="b3">Enter b3:</label>
        <input
          type="number"
          id="b3"
          value={b3}    
          onChange={(e) => setB3(e.target.value)}
          />
        </div>
        <button onClick={calculateSolution}>Calculate Solution</button>
        {x !== null && y !== null && z !== null && (
          <div>
            <p>The solution is:</p>
            <p>x = {x}</p>
            <p>y = {y}</p>
            <p>z = {z}</p>
          </div>
        )}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    );
  }
  
  export default CramersRule1;
  







