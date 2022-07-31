// eslint-disable-next-line no-global-assign
console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

export const TEST_CONTAINERS_TABLE_NAME = "dbtable-containers";

process.env.CONTAINERS_TABLE_NAME = TEST_CONTAINERS_TABLE_NAME;

beforeEach(() => {
  jest.resetAllMocks();
});
