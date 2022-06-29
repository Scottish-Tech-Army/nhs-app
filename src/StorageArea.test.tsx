import { render, screen } from "@testing-library/react";
import StorageArea, { getStaticProps } from "../pages/storage-area";
import "@testing-library/jest-dom";
import React from "react";
import storageAreaContents from "./data/traumaTower.json";

describe("StorageArea", () => {
  it("renders a home page", async () => {
    render(<StorageArea storageAreaContents={storageAreaContents} />);

    const links = await screen.findAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/box/0",
      "/box/1",
      "/box/2",
      "/box/3",
      "/box/4",
      "/box/5",
    ]);
    expect(links.map((link) => link.textContent)).toEqual([
      "trauma chest drain - box 1",
      "trauma chest drain - box 2",
      "trauma chest drain - box 3",
      "trauma chest drain - box 4",
      "trauma chest drain - box 5",
      "trauma chest drain - box 6",
    ]);
  });

  it("renders correctly", () => {
    const { container } = render(
      <StorageArea storageAreaContents={storageAreaContents} />
    );

    expect(container).toMatchSnapshot();
  });
});

describe("getStaticProps", () => {
  it("gets storageAreaContents", async () => {
    expect(await getStaticProps()).toEqual({
      props: {
        storageAreaContents, // From JSON import above
      },
    });
  });
});