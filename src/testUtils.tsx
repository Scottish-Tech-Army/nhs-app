import React from "react";
import { Provider } from "react-redux";

import { createMemoryHistory } from "history";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

import type { RootState } from "./model/store";
import authReducer, {
  initialState as authInitialState,
} from "./model/auth/AuthSlice";
import { SIGNED_IN } from "./model/auth/AuthStates";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<Partial<RootState>>;
  initialRoutes?: string[];
}

// render with redux store and react router history
export function renderWithProvider(
  component: React.ReactElement,
  {
    preloadedState = undefined,
    initialRoutes = ["/"],
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: authInitialState(),
      ...preloadedState,
    },
  });
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

export const INITIAL_SIGNED_IN_STATE: Partial<RootState> = {
  auth: {
    authState: SIGNED_IN,
    user: { name: "jsmith" },
    errorMessage: "",
  },
};
