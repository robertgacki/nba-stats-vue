<template>
  <div class="container mt-3 mb-3">
    <div class="row justify-content-center">
      <div class="col-4">
        <input
          type="text"
          class="form-control"
          placeholder="Type player name..."
          v-model="search"
          @keyup.enter="onSearchClick"
        />
      </div>
      <div class="col-2">
        <button
          type="button"
          class="btn btn-primary w-100"
          @click.prevent="onSearchClick"
        >
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const search = ref("");

    const onSearchClick = (): void => {
      router.push({ query: { ...route.query, search: search.value, page: 1 } });
    };

    watch(
      () => route.query.search,
      (newSearch) => {
        search.value = String(newSearch || "");
      },
      { immediate: true }
    );

    return { search, onSearchClick };
  },
});
</script>

<style scoped></style>
