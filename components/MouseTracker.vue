<template>
  <div class="mouse-tracker">
    <Typography color="purple" isItalic>
      Координаты курсора: X: {{ x }}, Y: {{ y }}
    </Typography>
  </div>
</template>

<script setup lang="ts">
import Typography from "~/components/Typography.vue";

const safeLocalStorage = useSafeLocalStorage();

const x = ref<number>(0);
const y = ref<number>(0);

const setNewCoordinates = (newX: number, newY: number) => {
  x.value = newX;
  y.value = newY;
};

const saveNewCoordinatesToStorage = (newX: number, newY: number) => {
  safeLocalStorage.setItem(
    "mouseCoordinates",
    JSON.stringify({ x: x.value, y: y.value })
  );
};

const updateCoordinates = (newX: number, newY: number) => {
  setNewCoordinates(newX, newY);
  saveNewCoordinatesToStorage(newX, newY);
};

const onUpdateCoordinates = (event) => {
  updateCoordinates(event.clientX, event.clientY);
};

const getCoordinatesFromStorage = () =>
  safeLocalStorage.getItem("mouseCoordinates");

const getSavedCoordinatesFromStorage = () => {
  const savedCoords = getCoordinatesFromStorage();
  if (!savedCoords) {
    return null;
  }
  try {
    return JSON.parse(savedCoords);
  } catch (error) {
    console.error("Сохраненные данные не валидны:", error);
    return null;
  }
};

const setSavedCoordinates = () => {
  const savedCoords = getSavedCoordinatesFromStorage();
  if (savedCoords) {
    updateCoordinates(savedCoords.x, savedCoords.y);
  }
};

const onWatchStorageValues = (event) => {
  if (event.key === "mouseCoordinates") {
    setSavedCoordinates();
  }
};

onMounted(() => {
  // При загрузке проверяем, есть ли координаты в localStorage и обновляем состояние
  setSavedCoordinates();

  // Следим за координатами в текущей вкладке
  window.addEventListener("mousemove", onUpdateCoordinates);

  // Обрабатываем событие изменения localStorage для синхронизации координат между вкладками
  window.addEventListener("storage", onWatchStorageValues);
});

onBeforeUnmount(() => {
  // Отписываемся чтобы не было утечки памяти
  window.removeEventListener("mousemove", onUpdateCoordinates);
  window.removeEventListener("storage", onWatchStorageValues);
});
</script>

<style scoped>
.mouse-tracker {
  text-align: center;
}
</style>
