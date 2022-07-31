import React from "react";

import { screen } from "@testing-library/react";
import { renderWithProvider } from "./testUtils";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders for missing-items page", () => {
    renderWithProvider(<Navbar />, {
      initialRoutes: ["/missing-items"],
    });

    expect(screen.getByRole("link", { name: "directory" })).not.toHaveClass(
      "active"
    );
    expect(screen.getByRole("link", { name: "missing-items" })).toHaveClass("active");

    expect(screen.getByLabelText("log out")).not.toHaveClass("active");
  });

  it("renders for directory", () => {
    const { container } = renderWithProvider(<Navbar />, {
      initialRoutes: ["/"],
    });

    expect(screen.getByRole("link", { name: "directory" })).toHaveClass(
      "active"
    );
    expect(screen.getByRole("link", { name: "missing-items" })).not.toHaveClass(
      "active"
    );

    expect(screen.getByLabelText("log out")).not.toHaveClass("active");

    expect(container).toMatchSnapshot();
  });

  it("navigates from missing-items page", async () => {
    const { user, history } = renderWithProvider(<Navbar />, {
      initialRoutes: ["/missing-items"],
    });

    await user.click(screen.getByRole("link", { name: "missing-items" }));

    expect(history.location.pathname).toEqual("/missing-items");

    await user.click(screen.getByRole("link", { name: "directory" }));

    expect(history.location.pathname).toEqual("/");
  });

  it("navigates from directory page", async () => {
    const { user, history } = renderWithProvider(<Navbar />, {
      initialRoutes: ["/"],
    });

    await user.click(screen.getByRole("link", { name: "directory" }));

    expect(history.location.pathname).toEqual("/");

    await user.click(screen.getByRole("link", { name: "missing-items" }));

    expect(history.location.pathname).toEqual("/missing-items");
  });

  it("shows logout confirmation", async () => {
    const { user } = renderWithProvider(<Navbar />);
    await user.click(screen.getByLabelText("log out"));

    expect(screen.getByText("Are you sure you want to leave?")).toBeDefined();
  });
});
