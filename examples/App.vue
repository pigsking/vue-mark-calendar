<template>
  <div id="calendar-wrap">
    <Default />

    <Events/>

    <Props />

    <Methods />
    
    <GitHubBadge slug="pigsking/vue-mark-calendar" />

    <div class="copyright">© {{ new Date().getFullYear() }} Allen AuYeung</div>
  </div>
</template>

<script>
import Default from "./components/Default";
import Events from "./components/Events";
import Props from "./components/Props";
import Methods from "./components/Methods";

import GitHubBadge from "vue-github-badge";
export default {
  components: {
    Default,
    Events,
    Props,
    Methods,
    GitHubBadge,
  },
};
</script>

<style scoped>
#calendar-wrap {
  max-width: 414px;
  margin: auto;
}
#custom-calendar >>> .choose-day span {
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
