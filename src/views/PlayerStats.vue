<template>
  <section>
    <div class="position-relative">
      <Loader v-if="playerPending" />
      <h1 class="display-4">
        {{ player.firstName }} {{ player.lastName
        }}<span v-if="player.position"> ({{ player.position }})</span>
      </h1>
      <p class="lead">{{ player.teamName }}</p>
    </div>
    <hr class="my-4" />
    <h2 class="display-6 mb-3">
      Average statistics
      <small class="text-muted">({{ startSeason }} - {{ endSeason }})</small>
    </h2>
    <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 position-relative"
    >
      <Loader v-if="statsPending" />
      <StatsCard
        v-for="card in cards"
        :key="card.dataKey"
        :title="card.title"
        :columnName="card.columnName"
        :data="stats"
        :dataKey="card.dataKey"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  ActionsTypes as PlayerActions,
  GettersTypes as PlayerGetters,
  Player,
} from "@/store/modules/player/player.types";
import {
  ActionsTypes as StatsActions,
  GettersTypes as StatsGetters,
  Stats,
} from "@/store/modules/stats/stats.types";
import Loader from "@/components/Loader.vue";
import StatsCard from "@/components/StatsCard.vue";

const START_SEASON = 2015;
const END_SEASON = 2020;

export default defineComponent({
  components: {
    Loader,
    StatsCard,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const playerId = Number(route.params.id);

    const fetchPlayerInfo = async (playerId: number) => {
      await store.dispatch(`player/${PlayerActions.FETCH}`, playerId);
    };

    const fetchPlayerStats = async (playerId: number) => {
      await store.dispatch(`stats/${StatsActions.FETCH}`, {
        playerId,
        startSeason: START_SEASON,
        endSeason: END_SEASON,
      });
    };

    onMounted(() => {
      fetchPlayerInfo(playerId);
      fetchPlayerStats(playerId);
    });

    const player = computed(
      (): Player => store.getters[`player/${PlayerGetters.GET_PLAYER}`]
    );
    const playerPending = computed(
      (): boolean => store.getters[`player/${PlayerGetters.GET_PENDING}`]
    );
    const statsPending = computed(
      (): boolean => store.getters[`stats/${StatsGetters.GET_PENDING}`]
    );
    const stats = computed((): Stats[] =>
      store.getters[`stats/${StatsGetters.GET_PLAYER_SEASONS_STATS}`](playerId)
    );
    const cards = [
      { title: "Game Played", columnName: "GP", dataKey: "gamesPlayed" },
      { title: "Points", columnName: "PTS", dataKey: "points" },
      { title: "Assists", columnName: "AST", dataKey: "assists" },
      { title: "Rebounds", columnName: "REB", dataKey: "rebounds" },
      { title: "Steals", columnName: "STL", dataKey: "steals" },
      { title: "Blocks", columnName: "BLK", dataKey: "blocks" },
    ];
    return {
      player,
      playerPending,
      statsPending,
      stats,
      startSeason: START_SEASON,
      endSeason: END_SEASON,
      cards,
    };
  },
});
</script>
