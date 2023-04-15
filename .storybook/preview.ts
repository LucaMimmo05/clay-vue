import type { Preview } from "@storybook/vue3";

import "../src/assets/style.scss";

const preview: Preview = {
    /*
    args: { theme: "light" },
    argTypes: {
        theme: {
            name: "Theme",
            type: { name: "string", required: false },
            description: "The theme used to display the whole UI.",
            table: {
                category: "Globals",
                subcategory: "UI",
                defaultValue: { summary: "light" },
                type: { summary: "light | dark" }
            },
            control: {
                type: "select",
                labels: {
                    "light": "Light",
                    "dark": "Dark"
                }
            },
            options: ["light", "dark"]
        }
    },
    */
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        }
    }
};

export default preview;
