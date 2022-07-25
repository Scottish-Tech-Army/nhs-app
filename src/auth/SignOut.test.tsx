import React from "react";
import { SignOut } from "./SignOut";
import { signOut } from "../model/auth/AuthActions";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProvider } from "../testUtils";

jest.mock("../model/auth/AuthActions");

describe("component SignOut", () => {
  beforeEach(() => {
    (signOut as jest.Mock).mockImplementation(() => () => "dummy action");
  });

  it("logout popup confirm logs user out", async () => {
    const { user, container } = renderWithProvider(<SignOut />);

    await user.click(screen.getByLabelText("log out"));

    expect(screen.getByText("Are you sure you want to leave?")).toBeDefined();
    expect(container).toMatchSnapshot();

    await user.click(screen.getByRole("button", { name: "YES" }));

    expect(signOut).toHaveBeenCalledTimes(1);
  });

  it("logout popup cancel does not log user out", async () => {
    const { user } = renderWithProvider(<SignOut />);

    await user.click(screen.getByLabelText("log out"));

    expect(screen.getByText("Are you sure you want to leave?")).toBeDefined();

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    await waitFor(() =>
      expect(screen.queryByText("Are you sure you want to leave?")).toBeNull()
    );

    expect(signOut).not.toHaveBeenCalled();
  });
});
