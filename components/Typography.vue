<template>
  <component
    :is="tag"
    :class="[typographyClass, { 'is-bold': isBold, 'is-italic': isItalic }]"
    :style="{
      color: color,
      fontSize: size,
      lineHeight: lineHeight,
    }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
type PropTypes = {
  tag?: string;
  color?: string;
  size?: string;
  lineHeight?: string;
  isBold?: boolean;
  isItalic?: boolean;
};

const props = withDefaults(defineProps<PropTypes>(), {
  tag: "p",
  color: "#000000",
  size: "1rem",
  lineHeight: "1.5",
  isBold: false,
  isItalic: false,
});

const typographyClass = computed(() => {
  switch (props.tag) {
    case "h1":
      return "text-h1";
    case "h2":
      return "text-h2";
    case "h3":
      return "text-h3";
    case "p":
      return "text-paragraph";
    case "span":
      return "text-span";
    default:
      return "text-paragraph";
  }
});
</script>

<style scoped>
.text-h1 {
  font-size: 2rem;
  line-height: 1.2;
}
.text-h2 {
  font-size: 1.75rem;
  line-height: 1.25;
}
.text-h3 {
  font-size: 1.5rem;
  line-height: 1.3;
}
.text-paragraph {
  font-size: 1rem;
  line-height: 1.5;
}
.text-span {
  font-size: 1rem;
}
.is-bold {
  font-weight: bold;
}
.is-italic {
  font-style: italic;
}
</style>
