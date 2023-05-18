import React from "react";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/blocks";
import type { Preview } from "@storybook/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import colours from "@enk/style/_colours.json";
import "../styles/global/index.scss";
import "!style-loader!css-loader!postcss-loader!sass-loader!./styles.scss";

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
