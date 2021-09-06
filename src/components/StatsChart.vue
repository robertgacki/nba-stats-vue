<template>
  <BarChart :chartData="data" :options="options" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  components: { BarChart },
  props: {
    seasons: { type: Array as PropType<number[]>, required: true },
    values: { type: Array as PropType<number[]>, required: true },
  },
  setup(props) {
    const { seasons, values } = toRefs(props);

    const data = computed<ChartData<"bar">>(() => ({
      labels: seasons.value,
      datasets: [
        {
          data: values.value,
        },
      ],
    }));

    const options = computed<ChartOptions<"bar">>(() => ({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    }));

    return { data, options };
  },
});
</script>
