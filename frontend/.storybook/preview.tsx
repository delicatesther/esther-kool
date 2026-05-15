import React from "react";
import type { Preview } from "@storybook/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import "../styles/global/index.scss";
import "!style-loader!css-loader!postcss-loader!sass-loader!./styles.scss";
import { ThemeProvider } from "next-themes";
import { ThemeChanger } from "@enk/utils";
import colours from "@enk/style/_colours.json";

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      items: ["light", "dark"],
      showName: true,
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (Story, { globals }) => (
    <ThemeProvider>
      <ThemeChanger theme={globals.theme ? globals.theme : "modern"} />
      <Story />
    </ThemeProvider>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextRouter: {
      Provider: RouterContext.Provider,
      path: "/", // defaults to `/`
      asPath: "/", // defaults to `/`
      query: {}, // defaults to `{}`
    },
    options: {
      storySort: (a, b) => (a.title === b.title ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true })),
    },
  },
};

export default preview;
