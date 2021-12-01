<template>
    <div class="home">
        <div class="intro">
        <h1>Bienvenue sur le réseau social de Groupomania </h1>
        <div class="post-input">
      <label class="label" for="titre">Titre : </label><br>
      <input
        id="titre"
        v-model="tittle"
        type="text"
        name="titre"
        placeholder="Titre du post"
        class="input_tittle"
      /><br />
      <label class="label" for="contenu">Post : </label><br>
      <input
      id="contenu"
        v-model="content"
        type="text"
        name="contenu"
        placeholder="Ecrivez votre post ici !"
        class="input_text"
      /><br />
      <button @click="createPost()" class="btn-publier">Publier</button>
    </div>
    <Post
      v-for="post in posts"
      :key="post.id"
      :userId="post.userId"
      :postDate="dateTimeDisplay(post.postDate)"
      :content="post.content"
      :tittle="post.tittle"
      :id="post.id"
    ></Post>
        </div>
    </div>
</template>

<script>
import Post from "../components/Post";
import axios from 'axios';

export default {
    name: 'Home',
    data: () => {
        return {
            posts: [],
            tittle:"",
            content:"",
        }
    },
    components: {
        Post,
    },
    methods: {
        isLogged() {
            if(localStorage.getItem('token') == null) {
                  this.$router.push({ path: "/" });
            } else {
              this.$store.state.token = localStorage.getItem('token')
              this.$store.state.userId = localStorage.getItem('userId')
            }
        },
        getAllPosts() {
          axios
            .get("http://localhost:8081/home", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.$store.state.token}`,
              },
            })
            .then((res) => {
              this.posts = res.data.result;
            })
            .catch((error) => {
              console.log(error);
            });
            },
        createPost() {
          const object = {
            tittle: this.tittle,
            content: this.content,
            userId: this.$store.state.userId
          }
          axios.post("http://localhost:8081/home", object,
           {headers: {
                Authorization: `Bearer ${this.$store.state.token}`,
              }})
          .then((res) => {
              console.log(res)
              this.tittle = ''
              this.content = ''
              this.getAllPosts()
            })
            .catch((error) => {
              console.log(error);
            });
        },
  },

    mounted() {
    this.getAllPosts()
    this.isLogged()
  }
}
</script>

<!--<template>
  <div id="home">
    <Header></Header>
    <div class="post-input">
      <label class="label" for="titre">Titre : </label><br>
      <input
        id="titre"
        v-model="tittle"
        type="text"
        name="titre"
        placeholder="Titre du post"
        class="input_tittle"
      /><br />
      <label class="label" for="contenu">Post : </label><br>
      <input
      id="contenu"
        v-model="content"
        type="text"
        name="contenu"
        placeholder="Ecrivez votre post ici !"
        class="input_text"
      /><br />
      <button @click="createPost()" class="btn-publier">Publier</button>
    </div>
    <Post
      v-for="post in posts"
      :key="post.id"
      :userId="post.userId"
      :postDate="dateTimeDisplay(post.postDate)"
      :content="post.content"
      :tittle="post.tittle"
      :id="post.id"
    ></Post>
  </div>
</template>

<script>
import Header from "../components/Header";
import Post from "../components/Post";
import axios from 'axios';
export default {
  name: 'Home',
  data: () => {
    return {
      posts: [],
      tittle:"",
      content:"",
    }
  },
  components: {
    Header,
    Post,
  },
  methods: {
    isLogged() {
        if(localStorage.getItem('token') == null) {
              this.$router.push({ path: "/" });
        } else {
          this.$store.state.token = localStorage.getItem('token')
          this.$store.state.userId = localStorage.getItem('userId')
        }
    },
    getAllPosts() {
      axios
        .get("http://localhost:8081/home", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.posts = res.data.result;
        })
        .catch((error) => {
          console.log(error);
        });
        },
    createPost() {
      const object = {
        tittle: this.tittle,
        content: this.content,
        userId: this.$store.state.userId
      }
      axios.post("http://localhost:8081/home", object,
       {headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          }})
      .then((res) => {
          console.log(res)
          this.tittle = ''
          this.content = ''
          this.getAllPosts()
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getAllPosts()
    this.isLogged()
  }
};
</script>-->


<style scoped>

h1 {
    text-align: center;
    margin: 3rem;
}
p {
    font-size: 2rem;
    text-align: center;
}
</style>

