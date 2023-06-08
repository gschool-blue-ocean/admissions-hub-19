import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

describe("true is truthy and false is falsy", () => {
  it("true is truthy", () => {
    expect(true).toBe(true);
  });

  it("false is falsy", () => {
    expect(false).toBe(false);
  });
});

//Made a small test here just to make sure github actions are working.
