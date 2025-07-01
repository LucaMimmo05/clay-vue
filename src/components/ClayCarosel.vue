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
  setup() {
    const carouselRef = ref<HTMLElement | null>(null);
    const isDragging = ref(false);
    const startX = ref(0);
    const scrollLeft = ref(0);

    const onWheel = (e: WheelEvent) => {
      if (!carouselRef.value) return;
      carouselRef.value.scrollLeft += e.deltaY;
    };

    const onDragStart = (e: MouseEvent) => {
      if (!carouselRef.value) return;
      isDragging.value = true;
      carouselRef.value.classList.add('dragging');
      startX.value = e.pageX - carouselRef.value.offsetLeft;
      scrollLeft.value = carouselRef.value.scrollLeft;
    };

    const onDragMove = (e: MouseEvent) => {
      if (!isDragging.value || !carouselRef.value) return;
      const x = e.pageX - carouselRef.value.offsetLeft;
      const walk = x - startX.value;
      carouselRef.value.scrollLeft = scrollLeft.value - walk;
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
    };
  },
});
</script>

<template>
  <div class="clay-carosel">
    <div
      class="clay-carosel__container"
      ref="carouselRef"
      @wheel.prevent="onWheel"
      @mousedown="onDragStart"
      @mousemove="onDragMove"
      @mouseup="onDragEnd"
      @mouseleave="onDragEnd"
    >
      <div v-for="(image, index) in images" :key="index" class="clay-carosel__item">
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

.clay-carosel__container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  user-select: none;
  gap: 24px;
  padding: 0 24px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* Firefox */
}

.clay-carosel__container::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}

.clay-carosel__item {
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
