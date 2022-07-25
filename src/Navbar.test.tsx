import React from "react";

import { screen } from "@testing-library/react";
import { renderWithProvider } from "./testUtils";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders for summary page", () => {
    renderWithProvider(<Navbar />, {
      initialRoutes: ["/summary"],
    });

    expect(screen.getByRole("link", { name: "directory" })).not.toHaveClass(
      "active"
    );
    expect(screen.getByRole("link", { name: "summary" })).toHaveClass("active");

    expect(screen.getByLabelText("log out")).not.toHaveClass("active");
  });

  it("renders for directory", () => {
    const { container } = renderWithProvider(<Navbar />, {
      initialRoutes: ["/"],
    });

    expect(screen.getByRole("link", { name: "directory" })).toHaveClass(
      "active"
    );
    expect(screen.getByRole("link", { name: "summary" })).not.toHaveClass(
      "active"
    );

    expect(screen.getByLabelText("log out")).not.toHaveClass("active");

    expect(container).toMatchSnapshot();
  });

  it("navigates from summary page", async () => {
    const { user, history } = renderWithProvider(<Navbar />, {
      initialRoutes: ["/summary"],
    });

    await user.click(screen.getByRole("link", { name: "summary" }));

    expect(history.location.pathname).toEqual("/summary");

    await user.click(screen.getByRole("link", { name: "directory" }));

    expect(history.location.pathname).toEqual("/");
  });

  it("navigates from directory page", async () => {
    const { user, history } = renderWithProvider(<Navbar />, {
      initialRoutes: ["/"],
    });

    await user.click(screen.getByRole("link", { name: "directory" }));

    expect(history.location.pathname).toEqual("/");

    await user.click(screen.getByRole("link", { name: "summary" }));

    expect(history.location.pathname).toEqual("/summary");
  });

  it("shows logout confirmation", async () => {
    const { user } = renderWithProvider(<Navbar />);
    await user.click(screen.getByLabelText("log out"));

    expect(screen.getByText("Are you sure you want to leave?")).toBeDefined();
  });
});
