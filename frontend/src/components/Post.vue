<template>
  <div class="post">
    <div class="post_header">
      <p class="header_name">{{ firstName }} {{ lastName }}</p>
      <h2 class="header_tittle">{{ tittle }}</h2>
      <span class="header_time"
        >{{ postDate }}
        <button
          v-if="userId == this.$store.state.userId"
          @click.prevent="deletePost(id)"
          class="post_button"
          aria-expanded="false"
          aria-label="Sort">
        
          <i class="fas fa-trash-alt"></i>
        </button>
      </span>
    </div>
    <p class="post_text">
      {{ content }}
    </p>
    <button
      class="comment_btn"
      @click.prevent="getPostComments(id), (clicked = true)"
    >
      Afficher les commentaires
    </button>
    <!--<button v-if="clicked=true" class="comment_btn" @click.prevent="clicked=false">Masquer les commentaires</button>-->
    <div v-if="(clicked = true)">
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :userId="comment.userId"
        :commentDate="dateTimeDisplay(comment.commentDate)"
        :commentContent="comment.commentContent"
        :postId="comment.postId"
        :id="comment.id"
      >
      </Comment>
      <div class="user_comment">
        <label>.
        <input
          v-model="commentContent"
          type="text"
          name="commentaire"
          placeholder=" Votre commentaire..."
          class="comment_input"
        /></label>
        <button @click.prevent="sendComment(id)" class="comment_btn">
          Publier
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import Comment from './Comment'
export default {
  name: "Post",
  props: ["userId", "content", "tittle", "id", "postDate"],
  components: {
    Comment
  },
  
  data: () => {
    return {
      commentContent: "",
      comments: [],
      firstName: "",
      lastName: "",
      NameComments: [],
      clicked: false
    };
  },
  methods: {
    deletePost(id) {
      axios
        .delete(`http://localhost:3000/home/${id}`,
        { headers: {
                'Authorization': `token ${this.$store.state.token}`
                }})
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserPost(userId) {
      axios
        .get(`http://localhost:3000/user/${userId}`, {
          headers: {
            Authorization: `token ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          this.firstName = res.data.result[0].firstname;
          this.lastName = res.data.result[0].lastname;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendComment(id) {
      const object = {
        content: this.commentContent,
        postId: id,
        userId: this.$store.state.userId,
      };
      axios
        .post("http://localhost:3000/comment/", object, {
          headers: {
            Authorization: `token ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.getPostComments(object.postId);
          this.commentContent = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPostComments(id) {
      axios.get(`http://localhost:3000/comment/${id}`, {
          headers: {
            Authorization: `token ${this.$store.state.token}`,
          },
        }).then((res) => {
        console.log(res.data.result);
        this.comments = res.data.result;
      });
    },
    dateTimeDisplay(dateString) {
      let chars = dateString.split("");
      let hours = parseInt(chars[11]+chars[12])
      if(hours > 21) {
        hours = '0' + hours-22
      } else {
        hours = hours + 2
      } 
      let commentDate =
        "le " +
        chars[8] +
        chars[9] +
        "/" +
        chars[5] +
        chars[6] +
        "/" +
        chars[2] +
        chars[3] +
        " à " +
        hours +
        "h" +
        chars[14] +
        chars[15];
      return commentDate;
    },
  },
  mounted() {
    this.getUserPost(this.userId);
  },
};
</script>
