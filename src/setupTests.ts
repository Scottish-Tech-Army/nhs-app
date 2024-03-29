// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

export const TEST_INVENTORY_API_ENDPOINT = "http://localhost:12345/api/";

process.env.REACT_APP_INVENTORY_API_ENDPOINT = TEST_INVENTORY_API_ENDPOINT;

// eslint-disable-next-line no-global-assign
console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetMocks();
});
