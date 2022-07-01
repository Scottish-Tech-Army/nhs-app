import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import storageAreaContents from "./data/traumaTower";

import Box from "./Box";

const setBoxContents = jest.fn();

describe("Box", () => {
  it("rendered a box page", async () => {
    render(
      <Box
        boxId={"3"}
        storageAreaContents={storageAreaContents}
        setBoxContents={setBoxContents}
      />
    );
    expect(screen.getByText("trauma chest drain - box 4")).toBeDefined();

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
    ]);

    expect(screen.getByRole("button", { name: "Submit" })).toBeDefined();
  });

  it("does not render if no boxId", async () => {
    const { container } = render(
      <Box
        boxId={""}
        storageAreaContents={storageAreaContents}
        setBoxContents={setBoxContents}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("does not render if unknown boxId", async () => {
    const { container } = render(
      <Box
        boxId={"Unknown"}
        storageAreaContents={storageAreaContents}
        setBoxContents={setBoxContents}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("can submit changes", async () => {
    const user = userEvent.setup();
    jest.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <Box
        boxId={"3"}
        setBoxContents={setBoxContents}
        storageAreaContents={storageAreaContents}
      />
    );

    const inputField = screen.getByRole("spinbutton", {
      name: "Blunt dissection chest drainage insertion pack",
    });

    await user.type(inputField, "5");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(inputField).toHaveDisplayValue("5");

    expect(setBoxContents).toHaveBeenCalledTimes(1);
    expect(setBoxContents).toHaveBeenCalledWith("3", [
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
    const { container } = render(
      <Box
        boxId={"3"}
        storageAreaContents={storageAreaContents}
        setBoxContents={setBoxContents}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
