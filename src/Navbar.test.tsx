import React from "react";

import { screen } from "@testing-library/react";
import { renderWithProvider } from "./testUtils";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders for summary page", () => {
    renderWithProvider(<Navbar />, {
      initialRoutes: ["/summary"],
    });

    expect(screen.getByRole("link", { name: "storage area" })).not.toHaveClass(
      "active"
    );
    expect(screen.getByRole("link", { name: "summary" })).toHaveClass("active");
  });

  it("renders for storage area", () => {
    const { container } = renderWithProvider(<Navbar />, {
      initialRoutes: ["/"],
    });

    expect(screen.getByRole("link", { name: "storage area" })).toHaveClass(
      "active"
    );
    expect(screen.getByRole("link", { name: "summary" })).not.toHaveClass(
      "active"
    );

    expect(container).toMatchSnapshot();
  });

  it("navigates from summary page", async () => {
    const { user, history } = renderWithProvider(<Navbar />, {
      initialRoutes: ["/summary"],
    });

    await user.click(screen.getByRole("link", { name: "summary" }));

    expect(history.location.pathname).toEqual("/summary");

    await user.click(screen.getByRole("link", { name: "storage area" }));

    expect(history.location.pathname).toEqual("/");
  });

  it("navigates from storage area page", async () => {
    const { user, history } = renderWithProvider(<Navbar />, {
      initialRoutes: ["/"],
    });

    await user.click(screen.getByRole("link", { name: "storage area" }));

    expect(history.location.pathname).toEqual("/");

    await user.click(screen.getByRole("link", { name: "summary" }));

    expect(history.location.pathname).toEqual("/summary");
  });
});
