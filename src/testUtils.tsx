import React from "react";
import { Provider } from "react-redux";

import { createMemoryHistory } from "history";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import type { RenderOptions, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

import type { AppStore, RootState } from "./data/store";
import boxContentsReducer, {
  createInitialState,
} from "./data/BoxContentsSlice";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  initialRoutes?: string[];
}

// render with redux store and react router history
export function renderWithProvider(
  component: React.ReactElement,
  {
    preloadedState = { boxContents: createInitialState() },
    store = configureStore({
      reducer: { boxContents: boxContentsReducer },
      preloadedState,
    }),
    initialRoutes = ["/"],
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const user = userEvent.setup();
  let history = createMemoryHistory({ initialEntries: initialRoutes });
  return {
    store,
    user,
    history,
    ...render(
      <Provider store={store}>
        <HistoryRouter history={history}>{component}</HistoryRouter>
      </Provider>,
      renderOptions
    ),
  };
}
