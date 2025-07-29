import { ref } from 'vue';
import ClayCarosel from './ClayCarosel.vue';
import ClayButton from './ClayButton.vue';

export default {
  title: 'Components/ClayCarosel',
  component: ClayCarosel,
};

export const Default = () => ({
  components: { ClayCarosel },
  template: `
    <div style="max-width: 600px; margin: auto;">
      <ClayCarosel />
    </div>
  `,
});

export const Vertical = () => ({
  components: { ClayCarosel },
  template: `
    <div style="max-width: 600px; height: 600px; margin: auto;">
      <ClayCarosel :vertical="true" />
    </div>
  `,
});

export const Button = () => ({
  components: { ClayCarosel, ClayButton },
  setup() {
    const caroselRef = ref(null);

    const scrollLeft = () => {
      caroselRef.value?.scrollPrev?.();
    };

    const scrollRight = () => {
      caroselRef.value?.scrollNext?.();
    };

    return {
      caroselRef,
      scrollLeft,
      scrollRight,
    };
  },
  template: `
    <div style="max-width: 600px; height: 600px; margin: auto; position: relative; display: flex; align-items: center;">
      
      <ClayButton
        @click="scrollLeft"
        style="position: absolute; left: -60px; z-index: 10;"
      >
        ←
      </ClayButton>

      <ClayCarosel ref="caroselRef" :vertical="false" />

      <ClayButton
        @click="scrollRight"
        style="position: absolute; right: -60px; z-index: 10;"
      >
        →
      </ClayButton>

    </div>
  `,
});
