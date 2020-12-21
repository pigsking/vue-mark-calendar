<template>
  <div id="calendar-wrap">
    <Default />

    <Events />

    <Props />

    <Methods />

    <GitHubBadge slug="pigsking/vue-mark-calendar" />

    <div class="copyright">© {{ new Date().getFullYear() }} Allen AuYeung</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
// import GitHubBadge from "vue-github-badge";

import Default from "./components/Default.vue";
import Events from "./components/Events.vue";
import Props from "./components/Props.vue";
import Methods from "./components/Methods.vue";

export default defineComponent({
  components: {
    Default,
    Events,
    Props,
    Methods,
    // GitHubBadge,
  },
});
</script>

<style scoped>
#calendar-wrap {
  max-width: 414px;
  margin: auto;
}
#custom-calendar :deep() .choose-day span {
  color: #fff !important;
}

/* copyright */
.copyright {
  padding: 30px 0;
  text-align: center;
  color: #ccc;
  font-size: 12px;
}
</style>
