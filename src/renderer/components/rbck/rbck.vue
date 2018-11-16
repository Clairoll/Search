<template >
  
</template>
<script>
  export default {
    name: 'rbck',
    data() {
      return {};
    },
    created() {
      this.backFun();
    },
    methods: {
      backFun() {
        this.$router.replace({ path: "/" });
      }
    },
    components: {}
  }
</script>
<style>

</style>
