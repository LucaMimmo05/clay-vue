<template>
  <div class="clay-carousel-css">
    <div class="carousel-wrapper">
      <input v-for="(_, index) in images"
             :key="`radio-${index}`"
             type="radio"
             name="carousel"
             class="carousel-radio"
             :id="`slide-${index}`"
             :checked="index === 0" />

      <!-- Carousel Slides -->
      <div class="carousel-track">
        <div v-for="(image, index) in images"
             :key="`slide-${index}`"
             class="carousel-slide">
          <ClayCard class="carousel-card">
            <img :src="image" alt="carousel image" class="carousel-img" />
          </ClayCard>
        </div>
      </div>

      <!-- Navigation dots -->
      <div class="carousel-dots">
        <label v-for="(_, index) in images"
               :key="`dot-${index}`"
               class="carousel-dot"
               :for="`slide-${index}`" />
      </div>

      <!-- Prev/Next Buttons CSS-only -->
      <div class="carousel-buttons">
        <template v-for="(_, index) in images">
          <label
            v-if="index > 0"
            :key="`prev-${index}`"
            class="carousel-button prev"
            :for="`slide-${index-1}`"
            :data-index="index"
            aria-label="Previous slide"
          >&#8592;</label>
          <label
            v-if="index < images.length - 1"
            :key="`next-${index}`"
            class="carousel-button next"
            :for="`slide-${index+1}`"
            :data-index="index"
            aria-label="Next slide"
          >&#8594;</label>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ClayCard from './ClayCard.vue'

defineProps<{
  images: string[]
}>()
</script>

<style scoped lang="scss">
$slide-width: 100%;

.clay-carousel-css {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 24px 0;
}

.carousel-wrapper {
  position: relative;
  max-width: 100%;
  margin: auto;
}

.carousel-radio {
  display: none;
}

.carousel-track {
  display: flex;
  width: 100%;
  transition: transform 0.5s ease;
}


.carousel-slide {
  flex: 0 0 $slide-width;
  /* nessun padding qui */
}

.carousel-card {
  background: none;
  box-shadow: var(--clay-shadow);
  border-radius: 16px;
  padding: 0 1rem; /* padding spostato qui */
}

.carousel-card {
  background: none;
  box-shadow: var(--clay-shadow);
  border-radius: 16px;
}

.carousel-img {
  width: 100%;
  border-radius: 16px;
  display: block;
}

// Slide positions (add more if needed)
input#slide-0:checked ~ .carousel-track {
  transform: translateX(0%);
}
input#slide-1:checked ~ .carousel-track {
  transform: translateX(-100%);
}
input#slide-2:checked ~ .carousel-track {
  transform: translateX(-200%);
}
input#slide-3:checked ~ .carousel-track {
  transform: translateX(-300%);
}
input#slide-4:checked ~ .carousel-track {
  transform: translateX(-400%);
}

// Dot navigation
.carousel-dots {
  text-align: center;
  margin-top: 1rem;
}
.carousel-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #bbb;
  border-radius: 50%;
  margin: 0 4px;
  cursor: pointer;
}

input#slide-0:checked ~ .carousel-dots label[for='slide-0'],
input#slide-1:checked ~ .carousel-dots label[for='slide-1'],
input#slide-2:checked ~ .carousel-dots label[for='slide-2'],
input#slide-3:checked ~ .carousel-dots label[for='slide-3'],
input#slide-4:checked ~ .carousel-dots label[for='slide-4'] {
  background: var(--primary-color, #007bff);
}

// Prev / Next buttons

.carousel-buttons {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  /* pointer-events: none;  <-- tolto per permettere click */
  z-index: 10;
}

.carousel-button {
  position: absolute;
  transform: translateY(-50%);
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s;
  display: block;
  border: none;
  outline: none;
}
.carousel-button.prev {
  left: 1rem;
}
.carousel-button.next {
  right: 1rem;
}
.carousel-button:hover {
  background: rgba(255, 255, 255, 1);
}

@media (prefers-color-scheme: dark) {
  .carousel-button {
    color: #111;
  }
}

// Visibility control for prev/next per slide
@for $i from 0 through 4 {
  input#slide-#{$i}:checked ~ .carousel-buttons .carousel-button[data-index='#{$i}'] {
    display: inline-block;
  }
  input#slide-#{$i}:checked ~ .carousel-buttons .carousel-button:not([data-index='#{$i}']) {
    display: none;
  }
}
</style>
