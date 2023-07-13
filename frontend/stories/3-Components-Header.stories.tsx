import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@enk/components/Header";
import commonArgTypes from "./commonArgTypes.json";
/**
 *
The header is the main header of the website, containing the logo and main navigation.

### Key features:
- Present on every page.
 */

const meta: Meta<typeof Header> = {
  title: "3. Components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    docs: {
        story: {
            inline: false,
            iframeHeight: 500
        }
    }
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};