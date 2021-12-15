<template>
  <div id="app">  
    <router-view/>
  </div>
</template>


<style lang="scss">
#app {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3f3d56;
}
body {
  margin: 0;
  padding: 0;
  
}
</style>

<!--<style>

* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  max-width: 100%;
}
body {
  background-color: #fcf3f1;
  display: flex;
  min-height: 100vh;
}
img {
  max-width: 100%;
  border-radius: 8px;
}
.card {
  max-width: 100%;
  width: 540px;
  background:white;
  border-radius: 16px;
  padding:32px;
  border: 1px solid #fc3914;
  margin: 5rem auto;
}
.card__title {
  text-align:center;
  font-weight: 800;
  margin-bottom: 2rem;
}
.card__subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}
  .button {
    background: #fc7c64;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }
  .card__action {
    color:#2196F3;
    text-decoration: underline;
  }
  .card__action:hover {
    cursor:pointer;
  }
  .button:hover {
    cursor:pointer;
    background: #fc3914;
  }
  .button--disabled {
    background:#cecece;
    color:#ececec
  }
.button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }
</style>-->