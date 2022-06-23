
// eslint-disable-next-line no-global-assign
console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

export const TEST_RACKS_TABLE_NAME = "dbtable-racks";
export const TEST_CHECKS_TABLE_NAME = "dbtable-checks";

process.env.RACKS_TABLE_NAME = TEST_RACKS_TABLE_NAME;
process.env.CHECKS_TABLE_NAME = TEST_CHECKS_TABLE_NAME;

beforeEach(() => {
  jest.resetAllMocks();

});
