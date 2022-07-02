import React from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { AppStore, RootState } from "./data/store";
import boxContentsReducer, { initialState } from "./data/BoxContentsSlice";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProvider(
  component: React.ReactElement,
  {
    preloadedState = { boxContents: initialState },
    store = configureStore({
      reducer: { boxContents: boxContentsReducer },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {

  return {
    store,
    ...render(<Provider store={store}>{component}</Provider>, renderOptions),
  };
}
