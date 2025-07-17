import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import ClayTabs from "./ClayTabs.vue";

interface StoryArgs {
    tabs: { id: string; title: string; content?: string; disabled?: boolean }[];
    modelValue: string;
    vertical: boolean;
    size: "small" | "default" | "large";
    onTabChanged: (tab: { id: string; title: string; content?: string; disabled?: boolean }) => void;
}

const defaultTabs = [
    { id: "tab1",
        title: "Tab 1",
        content:
        "<h3>Tab 1 Content</h3><p>This is the content for the first tab. It can contain HTML and other elements.</p>" },
    { id: "tab2", title: "Tab 2",
        content: "<h3>Tab 2 Content</h3><p>This is the content for the second tab with different information.</p>" },
    { id: "tab3", title: "Tab 3",
        content: "<h3>Tab 3 Content</h3><p>This is the content for the third tab.</p>" },
    { id: "tab4", title: "Disabled Tab",
        content: "<h3>Disabled Tab Content</h3><p>This tab is disabled and cannot be selected.</p>",
        disabled: true }
];

const meta: Meta<StoryArgs> = {
    title: "ClayTabs",
    component: ClayTabs,
    tags: ["autodocs"],
    argTypes: {
        tabs: {
            name: "Tabs",
            description: "Array of tab objects with id, title, content, and optional disabled property.",
            table: {
                category: "Component's",
                defaultValue: { summary: "[]" },
                type: { summary: "Tab[]" }
            },
            control: "object"
        },
        modelValue: {
            name: "Active Tab",
            type: { name: "string", required: false },
            description: "The ID of the currently active tab.",
            table: {
                category: "Component's",
                defaultValue: { summary: "" },
                type: { summary: "string" }
            },
            control: "text"
        },
        vertical: {
            name: "Vertical",
            type: { name: "boolean", required: false },
            description: "Whether the tabs should be displayed vertically.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: "boolean"
        },
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size of the tabs.",
            table: {
                category: "Component's",
                defaultValue: { summary: "default" },
                type: { summary: "small | default | large" }
            },
            control: {
                type: "select",
                labels: {
                    small: "Small",
                    default: "Default",
                    large: "Large"
                }
            },
            options: ["small", "default", "large"]
        },
        onTabChanged: {
            name: "On Tab Changed",
            type: { name: "function", required: false },
            description: "Callback function called when a tab is selected.",
            table: {
                category: "Events",
                type: { summary: "(tab: Tab) => void" }
            }
        }
    },
    args: {
        tabs: defaultTabs,
        modelValue: "tab1",
        vertical: false,
        size: "default",
        onTabChanged: fn()
    }
};

export const Default: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayTabs },
        setup: () => ({ args }),
        template: `
            <ClayTabs 
                :tabs="args.tabs"
                :model-value="args.modelValue"
                :vertical="args.vertical"
                :small="args.size === 'small'"
                :large="args.size === 'large'"
                @tab-changed="args.onTabChanged"
            />
        `
    })
};

export const Vertical: StoryObj<StoryArgs> = {
    args: {
        vertical: true,
        tabs: defaultTabs.slice(0, 3)
    },
    render: (args: StoryArgs) => ({
        components: { ClayTabs },
        setup: () => ({ args }),
        template: `
            <ClayTabs 
                :tabs="args.tabs"
                :model-value="args.modelValue"
                :vertical="args.vertical"
                :small="args.size === 'small'"
                :large="args.size === 'large'"
                @tab-changed="args.onTabChanged"
            />
        `
    })
};

export const Small: StoryObj<StoryArgs> = {
    args: {
        size: "small",
        tabs: defaultTabs.slice(0, 3)
    },
    render: (args: StoryArgs) => ({
        components: { ClayTabs },
        setup: () => ({ args }),
        template: `
            <ClayTabs 
                :tabs="args.tabs"
                :model-value="args.modelValue"
                :vertical="args.vertical"
                :small="args.size === 'small'"
                :large="args.size === 'large'"
                @tab-changed="args.onTabChanged"
            />
        `
    })
};

export const Large: StoryObj<StoryArgs> = {
    args: {
        size: "large",
        tabs: defaultTabs.slice(0, 3)
    },
    render: (args: StoryArgs) => ({
        components: { ClayTabs },
        setup: () => ({ args }),
        template: `
            <ClayTabs 
                :tabs="args.tabs"
                :model-value="args.modelValue"
                :vertical="args.vertical"
                :small="args.size === 'small'"
                :large="args.size === 'large'"
                @tab-changed="args.onTabChanged"
            />
        `
    })
};

export const WithCustomContent: StoryObj<StoryArgs> = {
    args: {
        tabs: [
            { id: "profile", title: "Profile", content: "" },
            { id: "settings", title: "Settings", content: "" },
            { id: "notifications", title: "Notifications", content: "" }
        ]
    },
    render: (args: StoryArgs) => ({
        components: { ClayTabs },
        setup: () => ({ args }),
        template: `
            <ClayTabs 
                :tabs="args.tabs"
                :model-value="args.modelValue"
                :vertical="args.vertical"
                :small="args.size === 'small'"
                :large="args.size === 'large'"
                @tab-changed="args.onTabChanged"
            >
                <template #default="{ activeTab }">
                    <div v-if="activeTab.id === 'profile'">
                        <h2>User Profile</h2>
                        <p>Name: John Doe</p>
                        <p>Email: john@example.com</p>
                        <p>Role: Administrator</p>
                    </div>
                    <div v-else-if="activeTab.id === 'settings'">
                        <h2>Settings</h2>
                        <label>
                            <input type="checkbox" checked> Enable notifications
                        </label><br>
                        <label>
                            <input type="checkbox"> Dark mode
                        </label><br>
                        <label>
                            <input type="checkbox" checked> Auto-save
                        </label>
                    </div>
                    <div v-else-if="activeTab.id === 'notifications'">
                        <h2>Notifications</h2>
                        <div style="padding: 1rem; background: #f0f0f0; border-radius: 0.5rem; margin-bottom: 1rem;">
                            <strong>New message from Sarah</strong><br>
                            <small>2 minutes ago</small>
                        </div>
                        <div style="padding: 1rem; background: #f0f0f0; border-radius: 0.5rem; margin-bottom: 1rem;">
                            <strong>System update available</strong><br>
                            <small>1 hour ago</small>
                        </div>
                        <div style="padding: 1rem; background: #f0f0f0; border-radius: 0.5rem;">
                            <strong>Welcome to Clay UI!</strong><br>
                            <small>Yesterday</small>
                        </div>
                    </div>
                </template>
            </ClayTabs>
        `
    })
};

export const WithDisabledTabs: StoryObj<StoryArgs> = {
    args: {
        tabs: [
            { id: "available", title: "Available",
                content: "<h3>Available Tab</h3><p>This tab is available and can be selected.</p>" },
            { id: "disabled1", title: "Disabled Tab 1",
                content: "<h3>Disabled Content</h3><p>This content won't be shown.</p>",
                disabled: true },
            { id: "enabled", title: "Another Available",
                content: "<h3>Another Available Tab</h3><p>This tab is also available.</p>" },
            { id: "disabled2", title: "Disabled Tab 2",
                content: "<h3>Disabled Content</h3><p>This content won't be shown either.</p>",
                disabled: true }
        ]
    },
    render: (args: StoryArgs) => ({
        components: { ClayTabs },
        setup: () => ({ args }),
        template: `
            <ClayTabs 
                :tabs="args.tabs"
                :model-value="args.modelValue"
                :vertical="args.vertical"
                :small="args.size === 'small'"
                :large="args.size === 'large'"
                @tab-changed="args.onTabChanged"
            />
        `
    })
};

export default meta;