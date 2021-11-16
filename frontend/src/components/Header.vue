<template>
  <header class="header">
    <div class="banner-line-top">
      <div id="logo">
        <a href="#/"
          ><img
            src="../assets/icon-above-font.png"
            alt="Logo Groupomania"
        /></a>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: "HeaderBloc",
  components: {
    
  },
};
</script>
<style scoped lang="scss">
.header {
  top: 0;
  width: 100vw;
  max-width: 1920px;
  background-color: #FFFF;
  }
  .banner-line-top {
    padding: 0;
    display: flex;
    border-bottom: solid #fd421b 4px;
    #logo {
      display: flex;
      width: 100vw;
      justify-content: center;
      img {
        width: 10rem;
        padding: 0 0 0 1rem;
      }
    }
  }

</style>