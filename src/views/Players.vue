<template>
  <section class="position-relative">
    <Loader v-if="pending" />
    <Search />
    <PlayersTable :players="players" />
    <Pagination :total="totalPages" :current="currentPage" />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";

import PlayersTable from "@/components/PlayersTable.vue";
import Pagination from "@/components/Pagination.vue";
import Loader from "@/components/Loader.vue";
import {
  ActionsTypes as PlayersActions,
  GettersTypes as PlayersGetters,
} from "@/store/modules/players/players.types";
import { useRoute } from "vue-router";
import Search from "@/components/Search.vue";

export default defineComponent({
  components: {
    PlayersTable,
    Pagination,
    Loader,
    Search,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const fetchPlayers = async (page = 1, search = "") => {
      await store.dispatch(`players/${PlayersActions.FETCH}`, { page, search });
    };

    watch(
      () => route.query,
      ({ page, search }) => {
        fetchPlayers(Number(page) || 1, String(search || ""));
      },
      { immediate: true }
    );

    return {
      players: computed(
        () => store.getters[`players/${PlayersGetters.GET_PLAYERS}`]
      ),
      totalPages: computed(
        () => store.getters[`players/${PlayersGetters.GET_TOTAL_PAGES}`]
      ),
      currentPage: computed(
        () => store.getters[`players/${PlayersGetters.GET_CURRENT_PAGE}`]
      ),
      pending: computed(
        () => store.getters[`players/${PlayersGetters.GET_PENDING}`]
      ),
    };
  },
});
</script>
