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
      <div class="button__class">
        <button @click="goToProfile" class="button" v-if="this.$store.state.user.userId >= 0">
        Mon espace
      </button>
      </div>
    </div>
  </header>
</template>

<script>


export default {
  name: "HeaderBloc",
  components: {
  },
  computed: {
    
  },
  methods: {
            goToProfile: function() {
              const userId = this.$store.state.user.userId;
              this.$router.push (`/profil/:${userId}`)
    },
        }
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
        
        argin: 0 0 0 6rem;
      }
    }
  }

  .button__class {
    font-size: .8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1Rem 0 0;
  }

</style>