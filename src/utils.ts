import { computed, ref } from "vue";

import type { ColorScheme } from "./types";

const _scheme = ref<ColorScheme>("light");

const _mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
if (_mediaQuery.matches) { _scheme.value = "dark"; }

const _onSchemaChange = (e: MediaQueryListEvent) =>
{
    if (e.matches) { _scheme.value = "dark"; }
    else { _scheme.value = "light"; }
};

_mediaQuery.addEventListener("change", _onSchemaChange);

const scheme = computed({
    get: () => _scheme.value,
    set: (value: ColorScheme) =>
    {
        const _body = document.querySelector<HTMLBodyElement>("body")!;

        if (value === "dark")
        {
            _body.removeAttribute("light");
            _body.setAttribute("dark", "");
        }
        else
        {
            _body.removeAttribute("dark");
            _body.setAttribute("light", "");
        }
    }
});

export const useTheme = () => ({ colorScheme: scheme });
