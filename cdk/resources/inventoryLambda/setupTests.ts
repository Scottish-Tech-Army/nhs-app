// eslint-disable-next-line no-global-assign
console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

export const TEST_BOXES_TABLE_NAME = "dbtable-boxes";

process.env.BOXES_TABLE_NAME = TEST_BOXES_TABLE_NAME;

beforeEach(() => {
  jest.resetAllMocks();
});
