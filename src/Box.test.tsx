import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams } from "react-router-dom";

import Box from "./Box";

const setBoxContents = jest.fn();

jest.mock("react-router-dom");

describe("Box", () => {
  it("rendered a box page", async () => {
    renderWithRoute("0", "3");
    expect(screen.getByText("trauma chest drain - box 3")).toBeDefined();

    const inputFields = screen.getAllByRole("spinbutton");

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      inputFields.map((input) => input.parentElement!.textContent)
    ).toEqual([
      "Blunt dissection chest drainage insertion pack",
      "Sterile gloves",
      "Sterile gloves",
      "Sterile gloves",
      "Chest drain catheter 28Fr",
      "Chest drain catheter 32Fr",
      "Chest drain catheter 36Fr",
      "ChloraPrep applicator",
      "Lidocaine 1%",
      "Standard suture pack",
      "Mefix roll",
      "Chest drain bottle",
      "Chest drain tubing",
      "Sterile water (H20) bottle",
      "Spencer wells forceps",
    ]);

    expect(screen.getByRole("button", { name: "Submit" })).toBeDefined();
  });

  it("does not render if no boxTemplateId", async () => {
    const { container } = renderWithRoute("", "3");

    expect(container).toMatchSnapshot();
  });


  it("does not render if no boxId", async () => {
    const { container } = renderWithRoute("0", "");

    expect(container).toMatchSnapshot();
  });

  it("does not render if unknown boxTemplateId", async () => {
    const { container } = renderWithRoute("Unknown", "4");

    expect(container).toMatchSnapshot();
  });

  it("does not render if unknown boxId", async () => {
    const { container } = renderWithRoute("0", "Unknown");

    expect(container).toMatchSnapshot();
  });

  it("can submit changes", async () => {
    const user = userEvent.setup();
    jest.spyOn(window, "alert").mockImplementation(() => {});

    renderWithRoute("0", "3");
 
    const inputField = screen.getByRole("spinbutton", {
      name: "Blunt dissection chest drainage insertion pack",
    });

    await user.type(inputField, "5");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(inputField).toHaveDisplayValue("5");

    expect(setBoxContents).toHaveBeenCalledTimes(1);
    expect(setBoxContents).toHaveBeenCalledWith("0", "3", [
      { name: "Blunt dissection chest drainage insertion pack", count: 5 },
      { name: "Sterile gloves", count: 0 },
      { name: "Sterile gloves", count: 0 },
      { name: "Sterile gloves", count: 0 },
      { name: "Chest drain catheter 28Fr", count: 0 },
      { name: "Chest drain catheter 32Fr", count: 0 },
      { name: "Chest drain catheter 36Fr", count: 0 },
    ]);
  });

  it("renders correctly", () => {
    const { container } = renderWithRoute("0", "3");

    expect(container).toMatchSnapshot();
  });

  function renderWithRoute(boxTemplateId: string, boxId: string) {
    (useParams as jest.Mock).mockReturnValue({boxTemplateId,  boxId });
    return render(
      <Box
        setBoxContents={setBoxContents}
      />
    );
  }
});