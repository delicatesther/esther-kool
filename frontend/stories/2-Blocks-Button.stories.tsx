import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@enk/components/Button";
import Sun from "@enk/icons/sun.svg";
import commonArgTypes from "./commonArgTypes.json";
/**
 *
The button is a button.

### Key features:


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
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const DefaultWithIcon: Story = {
  args: {
    children: <Sun />,
    text: undefined,
  },
};

export const DefaultWithTextAndIcon: Story = {
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
