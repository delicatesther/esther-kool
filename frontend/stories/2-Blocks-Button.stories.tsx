import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@enk/components/Button";
import Sun from "@enk/icons/sun.svg";
import commonArgTypes from "./commonArgTypes.json";
/**
 *
The button is a button.

### Key features:
- Implements standard HTML button conventions in terms of functionality and properties.
- Adheres to a11y conventions.
- Can have either text, an icon, or both.
 */

const meta: Meta<typeof Button> = {
  title: "2. Blocks/Button",
  component: Button,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ margin: "40px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    text: "Click me!",
  },
  argTypes: {
    className: commonArgTypes.className,
    onClick: {
      control: false,
    },
    // @ts-ignore: Ignore this "fake" argType, it is there for documentation purposes,
    //  but typescript does not know it (of course).
    "...props": {
      description: "All default HTML button attributes apply."
    }
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: <Sun />,
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: <Sun />,
  },
};

export const WithIcon: Story = {
  args: {
    children: <Sun />,
    text: undefined,
  },
};

