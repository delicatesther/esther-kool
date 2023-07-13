import type { Meta, StoryObj } from "@storybook/react";
import { Triangle } from "@enk/components/Triangle";
import commonArgTypes from "./commonArgTypes.json";
/**
 *
The triangle on the background of the website is based on the triangle I painted on my home office wall.

### Key features:
- Purely decorative
- Makes me smile
- Small nod to the [Hogeschool van Amsterdam](https://www.hva.nl/studeren) project
 */

const meta: Meta<typeof Triangle> = {
  title: "2. Blocks/Triangle",
  component: Triangle,
  tags: ["autodocs"],
  parameters: {
    docs: {
        story: {
            inline: false,
            iframeHeight: 500
        }
    }
  },
  decorators: [
    (Story) => (
        <Story />
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Triangle>;

export const Default: Story = {};