<template>
    <canvas ref="renderCanvas" style="width: 100%; height:100%;" id="renderCanvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Engine } from '../Engine/engine'

const renderCanvas = ref<HTMLCanvasElement | null>(null);
let babylonScene: Engine | null = null

onMounted(() => {
    if (renderCanvas.value) {
        babylonScene = new Engine(renderCanvas.value)
    }
})

onUnmounted(() => {
    if (babylonScene) {
        babylonScene.dispose();
    }
})
</script>
<script lang="ts">
export default {
    name: 'BabylonEntry'
}
</script>
<style scoped>
html, body, #renderCanvas {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>