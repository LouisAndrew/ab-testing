<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

import ControlPage from "./pages/ControlPage.vue";
import VariationPage from "./pages/VariationPage.vue";
import STORAGE_KEYS from "./lib/storage/keys";
import { shouldDisplayVariation } from "./lib/tracking/ab-test";
import { trackPageview } from "./lib/tracking/analytics-api";
import useStorage from "./lib/storage";
import { trackClick } from "./lib/tracking/track-click-events";
import PageLayout from "./PageLayout.vue";

const displayVariation = useStorage<boolean>(STORAGE_KEYS.DISPLAY_VARIATION).get({
  defaultValue: shouldDisplayVariation()
})!;

const onDocumentClick = (event: MouseEvent) => trackClick(event, displayVariation);

onMounted(() => {
  trackPageview({
    variation: displayVariation,
    url: window.location.href
  });
  document.addEventListener("click", onDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocumentClick);
});
</script>

<template>
  <PageLayout>
    <VariationPage v-if="displayVariation" />
    <ControlPage v-else />
  </PageLayout>
</template>
