<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !showPreviousButton }">
        <router-link :to="getPaginationRoute(currentPage - 1)" class="page-link"
          >Previous</router-link
        >
      </li>
      <li class="page-item d-none d-xl-block" v-if="showFirst">
        <router-link :to="getPaginationRoute(1)" class="page-link"
          >1</router-link
        >
      </li>
      <li class="page-item disabled d-none d-xl-block" v-if="showSpaceLeft">
        <a class="page-link" href="#">...</a>
      </li>
      <li
        class="page-item d-none d-xl-block"
        v-for="page in leftPages"
        :key="page"
      >
        <router-link :to="getPaginationRoute(page)" class="page-link">{{
          page
        }}</router-link>
      </li>
      <li class="page-item active">
        <a class="page-link">{{ currentPage }}</a>
      </li>
      <li
        class="page-item d-none d-xl-block"
        v-for="page in rightPages"
        :key="page"
      >
        <router-link :to="getPaginationRoute(page)" class="page-link">{{
          page
        }}</router-link>
      </li>
      <li class="page-item disabled d-none d-xl-block" v-if="showSpaceRight">
        <a class="page-link" href="#">...</a>
      </li>
      <li class="page-item d-none d-xl-block" v-if="showLast">
        <router-link :to="getPaginationRoute(lastPage)" class="page-link">{{
          lastPage
        }}</router-link>
      </li>
      <li class="page-item" :class="{ disabled: !showNextButton }">
        <router-link :to="getPaginationRoute(currentPage + 1)" class="page-link"
          >Next</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";
import { useRoute } from "vue-router";

const PAGES_LEFT = 2;
const PAGES_RIGHT = 2;
const MIN_SPACE = 2;

export default defineComponent({
  props: {
    total: { type: Number as PropType<number>, required: true },
    current: { type: Number as PropType<number>, required: true },
  },
  setup(props) {
    const { current, total } = toRefs(props);
    const route = useRoute();

    const getPaginationRoute = (page: number) => {
      return {
        query: {
          ...route.query,
          page,
        },
      };
    };

    const showPreviousButton = computed(() => current.value > 1);
    const showNextButton = computed(() => current.value < total.value);
    const showFirst = computed(() => current.value > 1);
    const showLast = computed(() => current.value < total.value);
    const currentPage = computed(() => current.value);
    const lastPage = computed(() => total.value);
    const showSpaceLeft = computed(
      () => current.value > PAGES_LEFT + MIN_SPACE + 1
    );
    const showSpaceRight = computed(
      () => current.value < total.value - PAGES_RIGHT - MIN_SPACE
    );
    const leftPages = computed(() => {
      let pages = [];
      let start = current.value - PAGES_LEFT;

      if (current.value - MIN_SPACE - PAGES_LEFT <= 1) {
        start -= MIN_SPACE;
      }
      for (let i = start; i < current.value; i++) {
        if (i > 1) {
          pages.push(i);
        }
      }
      return pages;
    });

    const rightPages = computed(() => {
      let pages = [];
      let end = current.value + PAGES_RIGHT;

      if (current.value + MIN_SPACE + PAGES_LEFT >= total.value) {
        end += MIN_SPACE;
      }
      for (let i = current.value + 1; i <= end; i++) {
        if (i < total.value) {
          pages.push(i);
        }
      }
      return pages;
    });

    return {
      showPreviousButton,
      showNextButton,
      showFirst,
      showLast,
      showSpaceLeft,
      showSpaceRight,
      currentPage,
      lastPage,
      leftPages,
      rightPages,
      getPaginationRoute,
    };
  },
});
</script>
