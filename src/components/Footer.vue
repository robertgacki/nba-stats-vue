<template>
  <div class="container">
    <footer
      class="
        d-flex
        flex-wrap
        justify-content-between
        align-items-center
        py-3
        my-4
        border-top
      "
    >
      <div class="col-md-4 d-flex align-items-center">
        <span class="text-muted">© 2021 Robert Gacki</span>
      </div>

      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3">
          <a
            class="text-muted"
            href="https://www.linkedin.com/in/robert-gacki-93b740100/"
            ><LinkedInIcon
          /></a>
        </li>
        <li class="ms-3">
          <a class="text-muted" href="https://github.com/robertgacki"
            ><GitHubIcon
          /></a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import LinkedInIcon from "@/assets/linkedin.svg?inline";
import GitHubIcon from "@/assets/github.svg?inline";

export default defineComponent({
  components: {
    LinkedInIcon,
    GitHubIcon,
  },
});
</script>
