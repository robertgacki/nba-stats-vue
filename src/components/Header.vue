<template>
  <header>
    <div class="px-3 py-2 bg-dark text-white">
      <div class="container">
        <div
          class="
            d-flex
            flex-wrap
            align-items-center
            justify-content-center justify-content-lg-start
          "
        >
          <router-link
            to="/"
            class="
              d-flex
              align-items-center
              my-2 my-lg-0
              me-lg-auto
              text-white text-decoration-none
            "
            >NBA Stats</router-link
          >

          <ul
            class="
              nav
              col-12 col-lg-auto
              my-2
              justify-content-center
              my-md-0
              text-small
            "
          >
            <li>
              <router-link to="/" class="nav-link text-secondary">
                <PeopleIcon
                  class="bi d-block mx-auto mb-1"
                  width="24"
                  height="24"
                ></PeopleIcon>
                Players
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PeopleIcon from "@/assets/people.svg?inline";

export default defineComponent({
  components: {
    PeopleIcon,
  },
});
</script>
