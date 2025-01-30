import type { Preview } from "@storybook/vue3";

import "@/assets/scss/main.scss";
import type { ColorScheme } from "@/types";

const _setColorScheme = (colorScheme: ColorScheme, body: HTMLBodyElement) => { body.style.colorScheme = colorScheme; };

const preview: Preview = {
    decorators: [(Story, context) =>
    {
        const { theme } = context.globals;

        const body = window.parent.document.querySelector<HTMLBodyElement>("body");
        if (!(body)) { return Story(); }

        _setColorScheme(theme, body);

        return Story();
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
        backgrounds: { disable: true },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },

    tags: ["autodocs"]
};

export default preview;
