<template>
  <div class="table-responsive">
    <table class="table table-hover my-3">
      <thead>
        <tr>
          <th scope="col">Player name</th>
          <th scope="col" class="text-center">Position</th>
          <th scope="col" class="text-center">Height</th>
          <th scope="col" class="text-center">Weight</th>
          <th scope="col">Team name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.id">
          <td>
            <router-link
              :to="{ name: 'Player', params: { id: player.id } }"
              class="link-primary"
              >{{ player.firstName }} {{ player.lastName }}</router-link
            >
          </td>
          <td class="text-center">{{ player.position }}</td>
          <td class="text-center">{{ player.height }}</td>
          <td class="text-center">{{ player.weight }}</td>
          <td>{{ player.teamName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Player } from "@/store/modules/players/players.types";

export default defineComponent({
  props: {
    players: Array as PropType<Player[]>,
  },
});
</script>
