import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FalsePo from "./False_position1";

describe("FalsePo", () => {
  test("test screen", () => {
    render(<FalsePo />);
    // const linkElement = screen.getByText(/Bisection Methods/i);
    // expect(linkElement).toBeInTheDocument();

    // Input XL
    const xlInput = screen.getByTestId("XL");
    fireEvent.change(xlInput, { target: { value: "1.5" } });

    // Input XR
    const xrInput = screen.getByTestId("XR");
    fireEvent.change(xrInput, { target: { value: "2" } });

    // Input equation
    const equation = screen.getByTestId("Equation");
    fireEvent.change(equation, { target: { value: "x^4-13" } });

    // Input error
    const error = screen.getByTestId("Error");
    fireEvent.change(error, { target: { value: "0.0001" } });

    // Click calculate button
    const myBtn = screen.getByTestId("myBtn");
    fireEvent.click(myBtn);

    // Check answer
    const answer = screen.getByTestId("ans");
    console.log(answer.textContent);
    expect(answer.textContent).toBe("Answer: 1.8988");
  });
});