import {
  signIn,
  signOut,
  signInCurrentUser,
  completeNewPassword,
} from "./AuthActions";
import { setAuthState, User } from "./AuthSlice";
import { RESET_PASSWORD, SIGNED_IN, SIGNED_OUT } from "./AuthStates";
import { Auth, CognitoUser } from "@aws-amplify/auth";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import store, { RootState } from "../store";

const TEST_USERNAME = "Bob Jones";

const SOFTWARE_TOKEN_MFA = "SOFTWARE_TOKEN_MFA";
const SMS_MFA = "SMS_MFA";

const TEST_COGNITO_USER = {
  getUsername: () => TEST_USERNAME,
} as unknown as CognitoUser;

const TEST_USER: User = {
  name: TEST_USERNAME,
};

const TEST_USER_WITH_COGNITO: User = {
  name: TEST_USERNAME,
  cognitoUser: TEST_COGNITO_USER,
};

const dispatch: ThunkDispatch<RootState, any, AnyAction> = store.dispatch;

jest.mock("@aws-amplify/auth");

const mockSignIn = Auth.signIn as jest.Mock;
const mockSignOut = Auth.signOut as jest.Mock;
const mockCurrentAuthenticatedUser = Auth.currentAuthenticatedUser as jest.Mock;
const mockCompleteNewPassword = Auth.completeNewPassword as jest.Mock;

describe("signIn", () => {
  beforeEach(() => {
    dispatch(setAuthState({ authState: SIGNED_OUT }));
  });

  it("signIn success", async () => {
    mockSignIn.mockImplementation(() => Promise.resolve(TEST_COGNITO_USER));

    await dispatch(signIn(TEST_USERNAME, "password"));
    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith(TEST_USERNAME, "password");
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "",
      authState: SIGNED_IN,
      user: TEST_USER,
    });
  });

  it("new password needed", async () => {
    const cognitoUser = {
      getUsername: () => TEST_USERNAME,
      challengeName: "NEW_PASSWORD_REQUIRED",
    } as unknown as CognitoUser;

    mockSignIn.mockImplementation(() => Promise.resolve(cognitoUser));

    await dispatch(signIn(TEST_USERNAME, "password"));
    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith(TEST_USERNAME, "password");
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "",
      authState: RESET_PASSWORD,
      user: {
        name: TEST_USERNAME,
        cognitoUser: cognitoUser,
      },
    });
  });

  it("confirm signin SMS - treat as error", async () => {
    const cognitoUser = {
      getUsername: () => TEST_USERNAME,
      challengeName: SMS_MFA,
    } as unknown as CognitoUser;

    mockSignIn.mockImplementation(() => Promise.resolve(cognitoUser));

    await dispatch(signIn(TEST_USERNAME, "password"));
    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith(TEST_USERNAME, "password");
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "auth challenge response: SMS_MFA",
      authState: SIGNED_OUT,
      user: undefined,
    });
  });

  it("confirm signin TOTP - treat as error", async () => {
    const cognitoUser = {
      getUsername: () => TEST_USERNAME,
      challengeName: SOFTWARE_TOKEN_MFA,
    } as unknown as CognitoUser;

    mockSignIn.mockImplementation(() => Promise.resolve(cognitoUser));

    await dispatch(signIn(TEST_USERNAME, "password"));
    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith(TEST_USERNAME, "password");
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "auth challenge response: SOFTWARE_TOKEN_MFA",
      authState: SIGNED_OUT,
      user: undefined,
    });
  });

  it("mfa TOTP setup - treat as error", async () => {
    const cognitoUser = {
      getUsername: () => TEST_USERNAME,
      challengeName: "MFA_SETUP",
    } as unknown as CognitoUser;

    mockSignIn.mockImplementation(() => Promise.resolve(cognitoUser));

    await dispatch(signIn(TEST_USERNAME, "password"));
    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith(TEST_USERNAME, "password");
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "auth challenge response: MFA_SETUP",
      authState: SIGNED_OUT,
      user: undefined,
    });
  });

  it("confirm registration - treat as error", async () => {
    mockSignIn.mockImplementation(() =>
      Promise.reject({
        code: "UserNotConfirmedException",
        message: "error message",
      })
    );

    await dispatch(signIn(TEST_USERNAME, "password"));
    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith(TEST_USERNAME, "password");
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "user not confirmed",
      authState: SIGNED_OUT,
      user: undefined,
    });
  });

  it("forgot password - treat as error", async () => {
    mockSignIn.mockImplementation(() =>
      Promise.reject({
        code: "PasswordResetRequiredException",
        message: "error message",
      })
    );

    await dispatch(signIn(TEST_USERNAME, "password"));
    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith(TEST_USERNAME, "password");
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "password reset required",
      authState: SIGNED_OUT,
      user: undefined,
    });
  });

  it("error calling signIn", async () => {
    mockSignIn.mockImplementation(() =>
      Promise.reject(new Error("test error"))
    );

    await dispatch(signIn(TEST_USERNAME, "password"));
    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith(TEST_USERNAME, "password");
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "test error",
      authState: SIGNED_OUT,
      user: undefined,
    });
  });
});

describe("signOut", () => {
  beforeEach(() => {
    dispatch(
      setAuthState({
        authState: SIGNED_IN,
        user: TEST_USER,
      })
    );

    mockSignOut.mockImplementation(() => Promise.resolve({}));
  });

  it("success", async () => {
    await dispatch(signOut());
    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "",
      authState: SIGNED_OUT,
      user: undefined,
    });
  });

  it("error calling signOut", async () => {
    mockSignOut.mockImplementation(() =>
      Promise.reject(new Error("test error"))
    );

    await dispatch(signOut());
    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "test error",
      authState: SIGNED_IN,
      user: TEST_USER,
    });
  });
});

describe("signInCurrentUser", () => {
  beforeEach(() => {
    dispatch(setAuthState({ authState: SIGNED_OUT }));

    mockCurrentAuthenticatedUser.mockImplementation(() =>
      Promise.resolve(TEST_COGNITO_USER)
    );
  });

  it("success", async () => {
    await dispatch(signInCurrentUser());
    expect(mockCurrentAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "",
      authState: SIGNED_IN,
      user: {
        name: TEST_USERNAME,
      },
    });
  });

  it("no user authenticated", async () => {
    mockCurrentAuthenticatedUser.mockImplementation(() =>
      Promise.reject(new Error("no user authenticated"))
    );

    await dispatch(signInCurrentUser());
    expect(mockCurrentAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "",
      authState: SIGNED_OUT,
      user: undefined,
    });
  });
});

describe("completeNewPassword", () => {
  beforeEach(() => {
    dispatch(setAuthState({ authState: RESET_PASSWORD, user: TEST_USER }));
  });

  it("success with cognito user", async () => {
    mockCompleteNewPassword.mockImplementation(() =>
      Promise.resolve(TEST_COGNITO_USER)
    );

    await dispatch(completeNewPassword(TEST_USER_WITH_COGNITO, "new password"));

    expect(mockCurrentAuthenticatedUser).not.toHaveBeenCalled();

    expect(mockCompleteNewPassword).toHaveBeenCalledTimes(1);
    expect(mockCompleteNewPassword).toHaveBeenCalledWith(
      TEST_COGNITO_USER,
      "new password",
      {}
    );
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "",
      authState: SIGNED_IN,
      user: TEST_USER,
    });
  });

  it("success without cognito user", async () => {
    mockCurrentAuthenticatedUser.mockImplementation(() =>
      Promise.resolve(TEST_COGNITO_USER)
    );
    mockCompleteNewPassword.mockImplementation(() =>
      Promise.resolve(TEST_COGNITO_USER)
    );

    await dispatch(completeNewPassword(TEST_USER, "new password"));
    expect(mockCurrentAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(mockCompleteNewPassword).toHaveBeenCalledTimes(1);
    expect(mockCompleteNewPassword).toHaveBeenCalledWith(
      TEST_COGNITO_USER,
      "new password",
      {}
    );
  });

  it("error calling currentAuthenticatedUser", async () => {
    mockCurrentAuthenticatedUser.mockImplementation(() =>
      Promise.reject(new Error("test error"))
    );

    await dispatch(completeNewPassword(TEST_USER, "new password"));
    expect(mockCurrentAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "test error",
      authState: RESET_PASSWORD,
      user: TEST_USER,
    });
  });

  it("error calling completeNewPassword", async () => {
    mockCurrentAuthenticatedUser.mockImplementation(() =>
      Promise.resolve(TEST_COGNITO_USER)
    );
    mockCompleteNewPassword.mockImplementation(() =>
      Promise.reject(new Error("test error"))
    );

    await dispatch(completeNewPassword(TEST_USER, "new password"));
    expect(mockCompleteNewPassword).toHaveBeenCalledTimes(1);
    expect(mockCompleteNewPassword).toHaveBeenCalledWith(
      TEST_COGNITO_USER,
      "new password",
      {}
    );
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "test error",
      authState: RESET_PASSWORD,
      user: TEST_USER,
    });
  });

  it("another challenge response calling completeNewPassword - failure", async () => {
    mockCurrentAuthenticatedUser.mockImplementation(() =>
      Promise.resolve(TEST_COGNITO_USER)
    );

    const cognitoUser = {
      getUsername: () => TEST_USERNAME,
      challengeName: "MFA_SETUP",
    } as unknown as CognitoUser;

    mockCompleteNewPassword.mockImplementation(() => Promise.resolve(cognitoUser));

    await dispatch(completeNewPassword(TEST_USER, "new password"));
    expect(mockCompleteNewPassword).toHaveBeenCalledTimes(1);
    expect(mockCompleteNewPassword).toHaveBeenCalledWith(
      TEST_COGNITO_USER,
      "new password",
      {}
    );
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "auth challenge response: MFA_SETUP",
      authState: RESET_PASSWORD,
      user: TEST_USER,
    });
  });
});
