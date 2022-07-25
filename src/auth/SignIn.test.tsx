/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import React from "react";
import {
  RESET_PASSWORD,
  SIGNED_IN,
  SIGNED_OUT,
} from "../model/auth/AuthStates";
import {
  completeNewPassword,
  signIn,
  signInCurrentUser,
} from "../model/auth/AuthActions";
import { renderWithProvider } from "../testUtils";
import { screen, waitFor } from "@testing-library/react";
import { setAuthError, setAuthState } from "../model/auth/AuthSlice";
import { SignIn } from "./SignIn";

jest.mock("../model/auth/AuthActions");

const TEST_USERNAME = "jsmith";

describe("component SignIn", () => {
  beforeEach(() => {
    (signInCurrentUser as jest.Mock).mockImplementation(
      () => () => Promise.resolve({})
    );
    (signIn as jest.Mock).mockImplementation(() => () => "dummy action");
    (completeNewPassword as jest.Mock).mockImplementation(
      () => () => "dummy action"
    );
  });

  it("states without visual - SIGNED_IN", () => {
    renderWithProvider(<SignIn />, {
      preloadedState: {
        auth: {
          authState: SIGNED_IN,
          user: { name: TEST_USERNAME },
          errorMessage: "",
        },
      },
    });
    expect(authenticatorSection()).toBeNull();
  });

  it("states with visuals - SIGNED_OUT", () => {
    renderWithProvider(<SignIn />, {
      preloadedState: {
        auth: {
          authState: SIGNED_OUT,
          user: { name: TEST_USERNAME },
          errorMessage: "",
        },
      },
    });
    expect(authenticatorSection()).not.toBeNull();
    expect(authenticatorTitle()).toHaveTextContent("Log in");
  });

  it("states with visuals - RESET_PASSWORD", () => {
    renderWithProvider(<SignIn />, {
      preloadedState: {
        auth: {
          authState: RESET_PASSWORD,
          user: { name: TEST_USERNAME },
          errorMessage: "",
        },
      },
    });
    expect(authenticatorSection()).not.toBeNull();
    expect(authenticatorTitle()).toHaveTextContent("Change Password");
  });

  it("initial effect check", () => {
    renderWithProvider(<SignIn />);
    expect(signInCurrentUser).toHaveBeenCalledTimes(1);
  });

  it("initial render and enable signIn action", async () => {
    const { user } = renderWithProvider(<SignIn />);
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const signInButton = document.querySelector("#action-button");

    expect(usernameInput).toHaveDisplayValue("");
    expect(passwordInput).toHaveDisplayValue("");
    expect(signInButton).toBeDisabled();

    // Form complete
    await user.type(usernameInput, TEST_USERNAME);
    await user.type(passwordInput, "12345678");
    expect(signInButton).not.toBeDisabled();

    // Name empty
    await user.clear(usernameInput);
    expect(signInButton).toBeDisabled();

    // Restore
    await user.type(usernameInput, TEST_USERNAME);
    expect(signInButton).not.toBeDisabled();

    // Password empty
    await user.clear(passwordInput);
    expect(signInButton).toBeDisabled();

    // Restore
    await user.type(passwordInput, "12345678");
    expect(signInButton).not.toBeDisabled();
  });

  it("confirm success", async () => {
    const { user } = renderWithProvider(<SignIn />);
    await user.type(screen.getByLabelText("Username"), TEST_USERNAME);
    await user.type(screen.getByLabelText("Password"), "12345678");

    const signInButton = document.querySelector("#action-button")!;
    await user.click(signInButton);

    expect(signIn).toHaveBeenCalledTimes(1);
    expect(signIn).toHaveBeenCalledWith(TEST_USERNAME, "12345678");
    expect(signInButton).toBeDisabled();
  });

  it("clear component on auth state update", async () => {
    const { user, store } = renderWithProvider(<SignIn />);
    await user.type(screen.getByLabelText("Username"), TEST_USERNAME);
    await user.type(screen.getByLabelText("Password"), "12345678");

    const signInButton = document.querySelector("#action-button")!;
    await user.click(signInButton);

    expect(signInButton).toBeDisabled();

    store.dispatch(
      setAuthState({
        authState: SIGNED_IN,
        user: { name: TEST_USERNAME },
      })
    );
    await waitFor(() => expect(authenticatorSection()).toBeNull());
  });

  it("end loading spinner on auth error", async () => {
    const { user, store } = renderWithProvider(<SignIn />);
    await user.type(screen.getByLabelText("Username"), TEST_USERNAME);
    await user.type(screen.getByLabelText("Password"), "12345678");

    const signInButton = document.querySelector("#action-button")!;
    await user.click(signInButton);

    expect(signInButton).toBeDisabled();

    store.dispatch(setAuthError("test error"));
    await waitFor(() => expect(signInButton).not.toBeDisabled());
  });

  it("alert on error state", async () => {
    const { store } = renderWithProvider(<SignIn />);

    store.dispatch(setAuthError("Test error"));
    await waitFor(() => expect(errorMessage()).toHaveTextContent("Test error"));

    store.dispatch(setAuthError(""));
    await waitFor(() => expect(errorMessage()).toBeNull());

    store.dispatch(setAuthError("Test error"));
    await waitFor(() => expect(errorMessage()).toHaveTextContent("Test error"));
  });

  it("reset password render and enable change action", async () => {
    const { container, user } = renderWithProvider(<SignIn />, {
      preloadedState: {
        auth: {
          authState: RESET_PASSWORD,
          user: { name: TEST_USERNAME },
          errorMessage: "",
        },
      },
    });
    const passwordInput = screen.getByLabelText("New password");
    const changeButton = container.querySelector("#action-button");

    expect(passwordInput).toHaveDisplayValue("");
    expect(changeButton).toBeDisabled();

    // Form complete
    await user.type(passwordInput, "123456");
    expect(changeButton).not.toBeDisabled();

    // Password empty
    await user.clear(passwordInput);
    expect(changeButton).toBeDisabled();

    // Restore
    await user.type(passwordInput, "123456");
    expect(changeButton).not.toBeDisabled();

    // Password too short
    await user.clear(passwordInput);
    await user.type(passwordInput, "12345");
    expect(changeButton).toBeDisabled();

    // Restore
    await user.type(passwordInput, "123456");
    expect(changeButton).not.toBeDisabled();
  });

  it("reset password success", async () => {
    const { container, user } = renderWithProvider(<SignIn />, {
      preloadedState: {
        auth: {
          authState: RESET_PASSWORD,
          user: { name: TEST_USERNAME },
          errorMessage: "",
        },
      },
    });
    await user.type(screen.getByLabelText("New password"), "new password");

    const changeButton = container.querySelector("#action-button")!;
    await user.click(changeButton);

    expect(completeNewPassword).toHaveBeenCalledTimes(1);
    expect(completeNewPassword).toHaveBeenCalledWith(
      { name: TEST_USERNAME },
      "new password"
    );
    expect(changeButton).toBeDisabled();
  });

  it("clear component on auth state update for reset password", async () => {
    const { container, store, user } = renderWithProvider(<SignIn />, {
      preloadedState: {
        auth: {
          authState: RESET_PASSWORD,
          user: { name: TEST_USERNAME },
          errorMessage: "",
        },
      },
    });
    await user.type(screen.getByLabelText("New password"), "new password");

    const changeButton = container.querySelector("#action-button")!;
    await user.click(changeButton);

    expect(changeButton).toBeDisabled();

    store.dispatch(
      setAuthState({
        authState: SIGNED_IN,
        user: { name: TEST_USERNAME },
      })
    );
    await waitFor(() => expect(authenticatorSection()).toBeNull());
  });

  it("end loading spinner on auth error for reset password", async () => {
    const { container, store, user } = renderWithProvider(<SignIn />, {
      preloadedState: {
        auth: {
          authState: RESET_PASSWORD,
          user: { name: TEST_USERNAME },
          errorMessage: "",
        },
      },
    });
    await user.type(screen.getByLabelText("New password"), "new password");

    const changeButton = container.querySelector("#action-button")!;
    await user.click(changeButton);

    expect(changeButton).toBeDisabled();

    store.dispatch(setAuthError("test error"));
    await waitFor(() => expect(changeButton).not.toBeDisabled());
  });

  const authenticatorSection = () => document.querySelector(".signin");
  const errorMessage = () => document.querySelector(".auth-alert");
  const authenticatorTitle = () => document.querySelector(".signin h2");
});
