import ClayCarosel from "./ClayCarosel.vue";

export default {
    title: "Components/ClayCarosel",
    component: ClayCarosel
};

export const Default = () => ({
    components: { ClayCarosel },
    template: `
    <div style="max-width: 600px; margin: auto;">
      <ClayCarosel />
    </div>
  `
});

export const Vertical = () => ({
    components: { ClayCarosel },
    template: `
    <div style="max-width: 600px; height: 600px; margin: auto;">
      <ClayCarosel :vertical="true" />
    </div>
  `
});

export const WithButtons = () => ({
    components: { ClayCarosel },
    template: `
    <div style="max-width: 600px; height: 600px; margin: auto;">
      <ClayCarosel with-buttons />
    </div>
  `
});
