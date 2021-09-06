<template>
  <div class="col">
    <div class="card h-100">
      <div class="card-header">{{ title }}</div>
      <div class="card-body">
        <StatsChart :seasons="seasons" :values="values" />
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">Season</th>
              <th scope="col">{{ columnName }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in data" :key="row.season">
              <th scope="row">{{ row.season }}</th>
              <td>{{ row[dataKey] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, watch } from "vue";
import { Stats } from "@/store/modules/stats/stats.types";
import StatsChart from "@/components/StatsChart.vue";

export default defineComponent({
  components: {
    StatsChart,
  },
  props: {
    title: String as PropType<string>,
    columnName: String as PropType<string>,
    dataKey: { type: String as PropType<string>, required: true },
    data: { type: Array as PropType<Stats[]>, required: true },
  },
  setup(props) {
    const { data, dataKey } = toRefs(props);

    const seasons = ref<number[]>([]);
    const values = ref<number[]>([]);

    watch(
      () => data.value,
      (newValue) => {
        seasons.value = [];
        values.value = [];
        newValue.forEach((stats) => {
          seasons.value.push(Number(stats.season));
          values.value.push(Number(stats[dataKey.value as keyof Stats]));
        });
      },
      { immediate: true }
    );

    return { seasons, values };
  },
});
</script>

<style scoped></style>
