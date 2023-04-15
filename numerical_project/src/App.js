
import './App.css';


import Bisection from './numer_code/Root_of_equation/Bisection';
import Bisection2 from './numer_code/Root_of_equation/Bisection2';
import FalsePosition from './numer_code/Root_of_equation/False_position';
import OnePointIteration from './numer_code/Root_of_equation/One_point_position';
import NewtonRaphson from './numer_code/Root_of_equation/Newton_Raphson';
import SecantMethod from './numer_code/Root_of_equation/Secant';
import CramersRule from './numer_code/Linear_Algebra/Cramer_rule';
import TrapezoidalRule from './numer_code/Integration/Trapezoidal';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';

// import { Button, Container, Row, Col, Form } from 'react-bootstrap';




import React, { useState } from 'react';
// import { Route, Router, Routes , HashRouter, BrowserRouter ,} from 'react-router-dom';

import {Navbar,Nav,NavDropdown,Container} from 'react-bootstrap';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  BrowserRouter
} from "react-router-dom";

import Gauss from './numer_code/Linear_Algebra/GaussJordan';


import CramersRule1 from './numer_code/Linear_Algebra/Cramer_rule1';
import GaussianElimination1 from './numer_code/Linear_Algebra/GaussJordan';
import Trapezoidal from './numer_code/Integration/Trapezoidal';
import NewtonDividedDifference from './numer_code/Interpolation/Newton Divvides-Difference';
import LagrangeInterpolation from './numer_code/Interpolation/Lagrange Divvides-Difference';
import TrapezoidalRuleSingleFile from './numer_code/Integration/Trapezoidal1';
import Simpsons from './numer_code/Integration/Simson';
import BisectionMethod from './numer_code/Root_of_equation/Bisection';
import LinearRegression from './numer_code/Regression/Linear_regression';
import BisectionMethod1 from './numer_code/Root_of_equation/Bisection1';
import BisectionMethod4 from './numer_code/Root_of_equation/Bisection';
import FalsePosition4 from './numer_code/Root_of_equation/False_position1';
import FalsePositionMethod1 from './numer_code/Root_of_equation/False_position1';
import CramerRule from './numer_code/Linear_Algebra/Cramer_rule';
import GaussJordan from './numer_code/Linear_Algebra/GaussJordan';




function App() {
  
  return(
    <BrowserRouter>
    <div>
      <Navbar bg="primary" expand="lg">
      <Container fluid>
        <Navbar.Brand>Numerical Methods</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '700px' }}
            navbarScroll
          >
            <NavDropdown title="Root of Equation" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/BisectionMethod4">Bisection</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/FalsePositionMethod1">Fasle Position</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Newton_raphson">Newton Raphson</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/One_point_position">One point positoion</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Secant">Secant</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Linear Algebra" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/CramerRule">Cramer's rule</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/GaussJordan">Gauss Jordan</NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="/">LU Decomposition</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">Cholesky Decomposition</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">Jacobi lteration</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">Gauss-seidel lteration</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">Conjugate Gradient</NavDropdown.Item> */}
            </NavDropdown>

            <NavDropdown title="Interpolation" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/NewtonDividedDifference">Newton Divvides-Difference</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/LagrangeInterpolation">Lagrange Divvides-Difference</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Regression" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/LinearRegression">Linear Regression</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">Polynomial Regression</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">Multiple Linear Regression</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Integration" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/TrapezoidalRuleSingleFile">Trapezoidal</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Simpsons">Simpson's</NavDropdown.Item> 
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <div>
      <Routes>
        <Route path="/BisectionMethod4" element={<BisectionMethod4/>}/>
        <Route path="/FalsePositionMethod1" element={<FalsePositionMethod1/>}/>
        <Route path="/Newton_raphson" element={<NewtonRaphson/>}/>
        <Route path="/One_Point_position" element={<OnePointIteration/>}/>
        <Route path="/Secant" element={<SecantMethod/>}/>

        <Route path="/CramerRule" element={<CramerRule/>}/>
        <Route path="/GaussJordan" element={<GaussJordan/>}/>
        {/* <Route path="/" element={<BisectionMethod/>}/>
        <Route path="/" element={<BisectionMethod/>}/>
        <Route path="/" element={<BisectionMethod/>}/>
        <Route path="/" element={<BisectionMethod/>}/>
        <Route path="/" element={<BisectionMethod/>}/> */}

        <Route path="/NewtonDividedDifference" element={<NewtonDividedDifference/>}/>
        <Route path="/LagrangeInterpolation" element={<LagrangeInterpolation/>}/>

        <Route path="/LinearRegression" element={<LinearRegression/>}/>
        <Route path="/" element={<BisectionMethod/>}/>
        <Route path="/" element={<BisectionMethod/>}/>

        <Route path="/TrapezoidalRuleSingleFile" element={<TrapezoidalRuleSingleFile/>}/>
        <Route path="/Simpsons" element={<Simpsons/>}/>

      </Routes>
    </div>





        {/* <h1>Bisection Method</h1>
        <Bisection /><hr></hr>
        <h1>False Position Method</h1>
        <FalsePosition /><hr></hr>
        <h1>OnePoint Position Method</h1>
        <OnePointIteration /><hr></hr>
        <h1>NewtonRaphson Method</h1>
        <NewtonRaphson /><hr></hr>
        <h1>Secant Method</h1>
        <SecantMethod /><hr></hr>

        <h1>Cramer rule</h1>
        <CramersRule />


        <h1>Gauss Jordan </h1>
        <h1>LU decomposition </h1>
        <h1>Chosikey decomposition </h1>

        <h1>Trapezoidal Rule</h1>
        <TrapezoidalRule/> */}

      </div>
    </BrowserRouter>

  )
}

export default App;


