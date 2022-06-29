import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import storageAreaContents from "./data/traumaTower.json";

import Box from "./Box";



const setBoxContents = jest.fn();

describe("Box", () => {
  it("rendered a box page", async () => {
    

    const { getAllByRole, getByRole } = render(
        <Box boxId={"3"}  storageAreaContents={storageAreaContents} />
    );
      expect(screen.getByText("Major Trauma Tower")).toBeDefined();
      
      const inputFields = getAllByRole("spinbutton");
    
      expect(inputFields.map((input) => input.parentElement!.textContent)).toEqual(
      [
        "Blunt dissection chest drainage insertion pack",
        "Sterile gloves",
        "Sterile gloves",
        "Sterile gloves",
        "Chest drain catheter 28Fr",
        "Chest drain catheter 32Fr",
        "Chest drain catheter 36Fr",
      ]
    );

    expect(getByRole("button", { name: "Submit" })).toBeDefined();
  });

  it("does not render if no boxId", async () => {

    const { container } = render(
      <Box storageAreaContents={storageAreaContents} />
    );

    expect(container).toMatchSnapshot();
  });

  it("can submit changes", async () => {
    const user = userEvent.setup();
    jest.spyOn(window, "alert").mockImplementation(() => {});

      const { getByRole } = render(
          <Box boxId={"3"} setBoxContents={setBoxContents} storageAreaContents={storageAreaContents} />
      );

    const inputField = getByRole("spinbutton", {
      name: "Blunt dissection chest drainage insertion pack",
    });

    await user.type(inputField, "5");
    await user.click(getByRole("button", { name: "Submit" }));

    expect(inputField).toHaveDisplayValue("5");

    expect(setBoxContents).toHaveBeenCalledTimes(1);
      expect(setBoxContents).toHaveBeenCalledWith(
        "3",
      [
        { "Blunt dissection chest drainage insertion pack": "5" },
        { "Sterile gloves": 0 },
        { "Sterile gloves": 0 },
        { "Sterile gloves": 0 },
        { "Chest drain catheter 28Fr": 0 },
        { "Chest drain catheter 32Fr": 0 },
        { "Chest drain catheter 36Fr": 0 },
      ]
    );
  });

  it("renders correctly", () => {

    const { container } = render(
      <Box boxId={"3"} storageAreaContents={storageAreaContents} />
    );

    expect(container).toMatchSnapshot();
  });
});
