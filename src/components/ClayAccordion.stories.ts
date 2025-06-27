import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import ClayAccordion from "./ClayAccordion.vue";

interface AccordionItem {
    id: string;
    title: string;
    content: string;
    disabled?: boolean;
}

interface StoryArgs {
    items: AccordionItem[];
    multiple: boolean;
    disabled: boolean;
    toggle: (id: string, isOpen: boolean) => void;
}

const defaultItems: AccordionItem[] = [
    {
        id: "item-1",
        title: "What is Clay Vue?",
        content:
      "Clay Vue is a modern UI component library built with Vue 3 and TypeScript. It provides a set of " +
      "beautiful, accessible, and customizable components for building modern web applications."
    },
    {
        id: "item-2",
        title: "How do I install Clay Vue?",
        content:
      "You can install Clay Vue using npm or yarn. Simply run 'npm install clay-vue' or " +
      "'yarn add clay-vue' in your project directory."
    },
    {
        id: "item-3",
        title: "Is Clay Vue accessible?",
        content:
      "Yes! Clay Vue components are built with accessibility in mind. All components follow WCAG " +
      "guidelines and include proper ARIA attributes, keyboard navigation, and screen reader support."
    },
    {
        id: "item-4",
        title: "Can I customize the theme?",
        content:
      "Absolutely! Clay Vue uses CSS custom properties (CSS variables) for theming. You can easily customize " +
      "colors, spacing, and other design tokens to match your brand."
    }
];

const meta: Meta<StoryArgs> = {
    title: "ClayAccordion",
    component: ClayAccordion,
    tags: ["autodocs"],
    argTypes: {
        items: {
            name: "Items",
            type: { name: "array", value: { name: "object", value: {} }, required: true },
            description: "Array of accordion items to display.",
            table: {
                category: "Component's",
                type: { summary: "AccordionItem[]" }
            },
            control: false
        },
        multiple: {
            name: "Multiple",
            type: { name: "boolean", required: false },
            description: "Allow multiple items to be open at the same time.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: "boolean"
        },
        disabled: {
            name: "Disabled",
            type: { name: "boolean", required: false },
            description: "Disable the entire accordion.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: "boolean"
        },
        toggle: {
            name: "Toggle Event",
            type: { name: "function", required: false },
            description: "Emitted when an accordion item is toggled.",
            table: {
                category: "Events",
                type: { summary: "(id: string, isOpen: boolean) => void" }
            },
            control: false
        }
    },
    args: {
        items: defaultItems,
        multiple: false,
        disabled: false,
        toggle: fn()
    }
};

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayAccordion },
        setup: () => ({ args }),
        template: `
            <div style="max-width: 600px; margin: 2rem auto;">
                <ClayAccordion :items="args.items"
                               :multiple="args.multiple"
                               :disabled="args.disabled"
                               @toggle="args.toggle" />
            </div>
        `
    })
};

export const Multiple: StoryObj<StoryArgs> = {
    args: {
        multiple: true
    },
    render: (args: StoryArgs) => ({
        components: { ClayAccordion },
        setup: () => ({ args }),
        template: `
            <div style="max-width: 600px; margin: 2rem auto;">
                <ClayAccordion :items="args.items"
                               :multiple="args.multiple"
                               :disabled="args.disabled"
                               @toggle="args.toggle" />
            </div>
        `
    })
};

export const WithDisabledItems: StoryObj<StoryArgs> = {
    args: {
        items: [
            {
                id: "item-1",
                title: "Active Item",
                content: "This item is active and can be clicked."
            },
            {
                id: "item-2",
                title: "Disabled Item",
                content: "This item is disabled and cannot be clicked.",
                disabled: true
            },
            {
                id: "item-3",
                title: "Another Active Item",
                content: "This item is also active."
            }
        ]
    },
    render: (args: StoryArgs) => ({
        components: { ClayAccordion },
        setup: () => ({ args }),
        template: `
            <div style="max-width: 600px; margin: 2rem auto;">
                <ClayAccordion :items="args.items"
                               :multiple="args.multiple"
                               :disabled="args.disabled"
                               @toggle="args.toggle" />
            </div>
        `
    })
};

export const DisabledAccordion: StoryObj<StoryArgs> = {
    args: {
        disabled: true
    },
    render: (args: StoryArgs) => ({
        components: { ClayAccordion },
        setup: () => ({ args }),
        template: `
            <div style="max-width: 600px; margin: 2rem auto;">
                <ClayAccordion :items="args.items"
                               :multiple="args.multiple"
                               :disabled="args.disabled"
                               @toggle="args.toggle" />
            </div>
        `
    })
};

export const SingleItem: StoryObj<StoryArgs> = {
    args: {
        items: [
            {
                id: "single-item",
                title: "Single Accordion Item",
                content: `This is an accordion with only one item. Perfect for simple FAQ sections or when you need a
                        collapsible content area.`
            }
        ]
    },
    render: (args: StoryArgs) => ({
        components: { ClayAccordion },
        setup: () => ({ args }),
        template: `
            <div style="max-width: 600px; margin: 2rem auto;">
                <ClayAccordion :items="args.items"
                               :multiple="args.multiple"
                               :disabled="args.disabled"
                               @toggle="args.toggle" />
            </div>
        `
    })
};

export default meta;