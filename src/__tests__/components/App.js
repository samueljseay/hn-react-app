import React from "react";
import { render, screen } from "@testing-library/react";
import { App, createIntersectionObserver } from "../../components/App";

jest.mock("../../state/reducer", () => ({
  createReducer: () => [{ stories: [] }, () => {}]
}));

const unobserveMock = jest.fn();
const observeMock = jest.fn();

class IntersectionObserver {
  constructor() {
    this.observe = observeMock;
    this.unobserve = unobserveMock;
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver
});

describe("App", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Renders an anchor div used for IntersectionObserver", () => {
    render(<App />);

    expect(screen.queryByTestId("bottom-anchor")).not.toBeNull();
  });
});

describe("createIntersectionObserver", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Returns a function for unobserving the IntersectionObserver", () => {
    const handler = createIntersectionObserver(jest.fn(), { current: null });
    const unobserveHandler = handler();

    unobserveHandler();
    expect(unobserveMock).toHaveBeenCalledTimes(1);
  });

  it("Does not call observe without an anchor ref", () => {
    const handler = createIntersectionObserver(jest.fn(), { current: null });
    handler();
    expect(observeMock).not.toHaveBeenCalled();
  });

  it("Does call observe if there is a non-null anchor ref", () => {
    const mockRef = {};
    const handler = createIntersectionObserver(jest.fn(), { current: mockRef });
    handler();

    expect(observeMock).toHaveBeenCalledTimes(1);
    expect(observeMock).toHaveBeenCalledWith(mockRef);
  });
});
