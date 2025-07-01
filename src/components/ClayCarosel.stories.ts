import ClayCarosel from './ClayCarosel.vue';

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
