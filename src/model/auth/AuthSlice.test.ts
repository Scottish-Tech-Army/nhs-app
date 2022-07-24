import reducer, {
  AuthStoreState,
  clearAuthError,
  setAuthError,
  setAuthState,
  setState,
} from "./AuthSlice";
import { SIGNED_IN, SIGNED_OUT } from "./AuthStates";
import { AnyAction } from "redux";
import { createStore } from "../store";

describe("authReducer", () => {
  const store = createStore();
  const dispatch = store.dispatch;

  it("initial state - empty", () => {
    expect(reducer(undefined, {} as AnyAction)).toStrictEqual(EMPTY_STATE);
  });

  it("action setAuthError", () => {
    dispatch(setState(STATE_WITHOUT_AUTH_ERROR));
    expect(store.getState().auth).toStrictEqual(STATE_WITHOUT_AUTH_ERROR);

    dispatch(setAuthError("new error"));
    expect(store.getState().auth).toStrictEqual(STATE_WITH_AUTH_ERROR);

    dispatch(setAuthError(""));
    expect(store.getState().auth).toStrictEqual(STATE_WITHOUT_AUTH_ERROR);

    dispatch(setState(STATE_WITH_AUTH_ERROR));
    expect(store.getState().auth).toStrictEqual(STATE_WITH_AUTH_ERROR);

    dispatch(setAuthError("new error"));
    expect(store.getState().auth).toStrictEqual(STATE_WITH_AUTH_ERROR);
  });

  it("action clearAuthError", () => {
    dispatch(setState(STATE_WITH_AUTH_ERROR));
    expect(store.getState().auth).toStrictEqual(STATE_WITH_AUTH_ERROR);

    dispatch(clearAuthError());
    expect(store.getState().auth).toStrictEqual(STATE_WITHOUT_AUTH_ERROR);

    dispatch(clearAuthError());
    expect(store.getState().auth).toStrictEqual(STATE_WITHOUT_AUTH_ERROR);
  });

  it("action setAuthState", () => {
    dispatch(
      setState({
        ...INPUT_STATE,
        errorMessage: "new error",
        authState: SIGNED_OUT,
        user: { name: "Bob Jones" },
      })
    );

    dispatch(
      setAuthState({
        authState: "new auth state",
        user: { name: "John Smith" },
      })
    );
    expect(store.getState().auth).toStrictEqual({
      errorMessage: "",
      authState: "new auth state",
      user: { name: "John Smith" },
    });
  });

  it("action setAuthState authState undefined", () => {
    dispatch(setState(INPUT_STATE));

    dispatch(
      setAuthState({
        user: { name: "new user" },
      })
    );
    expect(store.getState().auth).toStrictEqual(INPUT_STATE);
  });
});

const EMPTY_STATE: AuthStoreState = {
  errorMessage: "",
  authState: SIGNED_OUT,
};

const INPUT_STATE: AuthStoreState = {
  errorMessage: "",
  authState: SIGNED_IN,
  user: { name: "Bob Jones" },
};

const STATE_WITH_AUTH_ERROR: AuthStoreState = {
  errorMessage: "new error",
  authState: SIGNED_OUT,
  user: { name: "Bob Jones" },
};

const STATE_WITHOUT_AUTH_ERROR: AuthStoreState = {
  errorMessage: "",
  authState: SIGNED_OUT,
  user: { name: "Bob Jones" },
};
