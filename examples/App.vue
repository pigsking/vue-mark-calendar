<template>
  <div id="calendar-wrap">
    <Default />

    <Custom />

    <GitHubBadge slug="pigsking/vue-mark-calendar"/>
    
    <div class="copyright">© {{ new Date().getFullYear() }} Allen AuYeung</div>
  </div>
</template>

<script>
import Default from "./components/Default";
import Custom from "./components/Custom";
import GitHubBadge from 'vue-github-badge'
export default {
  components: {
    Default,
    Custom,
    GitHubBadge
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
