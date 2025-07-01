<script lang="ts">
import { ref, defineComponent } from 'vue';
import ClayCard from './ClayCard.vue';

const images = [
  'https://placehold.co/600x400/222/fff?text=Image+1',
  'https://placehold.co/600x400/444/fff?text=Image+2',
  'https://placehold.co/600x400/666/fff?text=Image+3',
];

export default defineComponent({
  name: 'ClayCarosel',
  components: { ClayCard },
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const carouselRef = ref<HTMLElement | null>(null);
    const isDragging = ref(false);
    const startPos = ref(0);
    const scrollStart = ref(0);

    const onWheel = (e: WheelEvent) => {
      if (!carouselRef.value) return;
      props.vertical
        ? (carouselRef.value.scrollTop += e.deltaY)
        : (carouselRef.value.scrollLeft += e.deltaY);
    };

    const onDragStart = (e: MouseEvent) => {
      if (!carouselRef.value) return;
      isDragging.value = true;
      carouselRef.value.classList.add('dragging');
      startPos.value = props.vertical
        ? e.pageY - carouselRef.value.offsetTop
        : e.pageX - carouselRef.value.offsetLeft;
      scrollStart.value = props.vertical
        ? carouselRef.value.scrollTop
        : carouselRef.value.scrollLeft;
    };

    const onDragMove = (e: MouseEvent) => {
      if (!isDragging.value || !carouselRef.value) return;
      const current = props.vertical
        ? e.pageY - carouselRef.value.offsetTop
        : e.pageX - carouselRef.value.offsetLeft;
      const walk = current - startPos.value;
      props.vertical
        ? (carouselRef.value.scrollTop = scrollStart.value - walk)
        : (carouselRef.value.scrollLeft = scrollStart.value - walk);
    };

    const onDragEnd = () => {
      if (!carouselRef.value) return;
      isDragging.value = false;
      carouselRef.value.classList.remove('dragging');
    };

    return {
      images,
      carouselRef,
      onWheel,
      onDragStart,
      onDragMove,
      onDragEnd,
      isVertical: props.vertical,
    };
  },
});
</script>

<template>
  <div class="clay-carosel" :class="{ vertical: isVertical }">
    <div
      class="clay-carosel__container"
      ref="carouselRef"
      @wheel.prevent="onWheel"
      @mousedown="onDragStart"
      @mousemove="onDragMove"
      @mouseup="onDragEnd"
      @mouseleave="onDragEnd"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="clay-carosel__item"
        :class="{ vertical: isVertical }"
      >
        <ClayCard :style="{ background: 'none', boxShadow: 'var(--clay-shadow)' }">
          <img :src="image" alt="Image" class="clay-carosel__image" />
        </ClayCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clay-carosel {
  width: 100%;
  overflow: hidden;
  padding: 24px 0;
}

.clay-carosel.vertical {
  height: 100%;
  padding: 24px 0;
}

.clay-carosel__container {
  display: flex;
  overflow: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  user-select: none;
  gap: 24px;
  padding: 0 24px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  flex-direction: row;
}

.clay-carosel.vertical .clay-carosel__container {
  flex-direction: column;
  scroll-snap-type: y mandatory;
  height: 100%;
  padding: 0 24px;
}

.clay-carosel__container::-webkit-scrollbar {
  display: none;
}

.clay-carosel__item {
  flex: 0 0 80%;
  scroll-snap-align: center;
  transition: transform 0.3s ease;
}

.clay-carosel__item.vertical {
  flex: 0 0 80%;
  scroll-snap-align: center;
  transition: transform 0.3s ease;
}

.clay-carosel__image {
  width: 100%;
  border-radius: 16px;
  display: block;
}

.dragging {
  cursor: grabbing !important;
  user-select: none;
}
</style>
