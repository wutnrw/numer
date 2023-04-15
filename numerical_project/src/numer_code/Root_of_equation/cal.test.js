import { calculateOnePointIteration } from "./Calonepoint";

test("testcal_bi", () => {
    let cal = calculateOnePointIteration(0, 0.0001, "1/4+x/2");

    expect(cal.xnew).toBe(-0.49993896484375);
  });