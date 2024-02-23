import { ref, readonly } from "vue";

import type { ColorScheme } from "./types";

const _scheme = ref<ColorScheme>("light");
const scheme = readonly(_scheme);

const getScheme = (body?: HTMLBodyElement) =>
{
    const _get = (be: HTMLBodyElement) =>
    {
        if (be.hasAttribute("dark")) { return "dark"; }

        return "light";
    };

    if (body) { return _get(body); }

    const _body = document.querySelector<HTMLBodyElement>("body");
    if (_body) { return _get(_body); }

    return "light";
};
const setScheme = (colorScheme: ColorScheme, body?: HTMLBodyElement) =>
{
    const _set = (be: HTMLBodyElement, cs: ColorScheme) =>
    {
        if (cs === "dark")
        {
            be.removeAttribute("light");
            be.setAttribute("dark", "");

            _scheme.value = "dark";
        }
        else
        {
            be.removeAttribute("dark");
            be.setAttribute("light", "");

            _scheme.value = "light";
        }
    };

    if (body) { return _set(body, colorScheme); }

    const _body = document.querySelector<HTMLBodyElement>("body");
    if (_body) { return _set(_body, colorScheme); }
};

export const useTheme = () => ({
    colorScheme: scheme,

    getColorScheme: getScheme,
    setColorScheme: setScheme
});
