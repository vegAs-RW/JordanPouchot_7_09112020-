<template>
  <div id="Comment">
    <div class="post_comment">
      <span class="comment_name">{{ firstName }} {{ lastName }}</span>
      <span class="comment_text">
        {{ commentContent }}
      </span>
      <span class="comment_time"
        >{{ commentDate }}
        <button
          @click.prevent="deleteComment(id)"
          v-if="userId == this.$store.state.userId"
          class="comment_button"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Comment",
  props: ["userId", "commentContent", "postId", "id", "commentDate"],
  data: () => {
    return {
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    deleteComment(id) {
      axios
        .delete(`http://localhost:3000/comment/${id}`,
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
    getUserComment(userId) {
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
  },
  mounted() {
    this.getUserComment(this.userId);
  },
};
</script>