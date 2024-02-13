import type { Preview } from "@storybook/vue3";

import "@/assets/style.scss";
import { useTheme } from "@/utils";

const preview: Preview = {
    decorators: [(Story, context) =>
    {
        const $theme = useTheme();
        const { theme } = context.globals;

        const body = document.querySelector<HTMLBodyElement>("body");
        if (!body) { return Story(); }

        $theme.setColorScheme(theme, body);

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
