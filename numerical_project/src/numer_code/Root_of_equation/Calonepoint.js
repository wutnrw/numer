import { evaluate } from 'mathjs';

export const calculateOnePointIteration = (initialGuess,error,equation) => {
    let newPoints = [];
    let x = initialGuess;
    let xNew, fX;
    let iteration = 0;
    const maxIterations = 50;
    

    do {
      fX = evaluate(equation, { x: x });
      xNew = x - fX;
      newPoints.push({ x: x, fX: fX, xNew: xNew });
      x = xNew;
      iteration++;
    } while (Math.abs(fX) > error && iteration < maxIterations);
    console.log(newPoints);
    console.log(x);
    console.log(newPoints[newPoints.length-1].xNew)

    return{newPointss: newPoints,xnew: x}


  };