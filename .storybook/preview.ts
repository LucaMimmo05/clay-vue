import { defineComponent } from "vue";

import type { Preview } from "@storybook/vue3";

import "../src/assets/style.scss";

const preview: Preview = {
    decorators: [(Story, context) =>
    {
        const StoryComponent = Story();

        const theme = context.globals.theme;

        return defineComponent({
            components: { StoryComponent },
            provide: () => ({ theme }),
            mounted: () =>
            {
                const backgroundColor = (theme === "dark") ? "#333333" : "#F8F8F8";

                let preview: HTMLElement = document.querySelector<HTMLDivElement>(".sbdocs-preview");
                if (preview === null)
                {
                    preview = document.querySelector<HTMLBodyElement>("body.sb-show-main");
                }

                preview.style.backgroundColor = backgroundColor;
                preview.style.transition = "background-color var(--clay-ease-duration) var(--clay-ease-function)";
            },
            template: `<StoryComponent />`
        });
    }],
    globalTypes: {
        theme: {
            name: "Theme",
            description: "The theme used to display the whole UI",
            defaultValue: "light",
            toolbar: {
                items: [
                    { icon: "sun", value: "light", title: "Light", right: "(default)" },
                    { icon: "moon", value: "dark", title: "Dark" }
                ],
                showName: true,
                dynamicTitle: true
            }
        }
    },
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        backgrounds: { disable: true },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        }
    }
};

export default preview;
