var app = new Vue({
  el:'#app',
  data: {
    token: 0,
    users: [],
    posts: [],
    post: {
      title:''
    }
  },
  watch: {
      'token': function(newVal, oldVal) {
          if (newVal.length > 0) {
              localStorage.setItem('token', this.token);
              this.loadPosts();
          }
      }
  },
  methods: {
    loadUsers: function() {
      fetch('http://localhost:3001/users')
      .then(response=> response.json())
      .then(response => {
        console.log("response:", response);
        this.users = response
      });
    },
    sendRequest: function(id) {
      this.$http.post(`http://localhost:3001/friends/${id}?token=${this.token}`, this.post)
      .then((response) => {
          console.log("response:", response);
      })
    },
    loadPosts: function() {
      this.$http.get('http://localhost:3001/posts?token=' + this.token)
      .then(response=> response.json())
      .then(response => {
        this.posts = response
      });
    },
    savePost: function() {
      this.$http.post('http://localhost:3001/posts?token=' +this.token, this.post)
      .then((response) => {
          this.loadPosts();
          this.post.title = '';
      })
    }
  },
  created() {
      if (localStorage.getItem('token')) {
          this.token = localStorage.getItem('token');
          this.loadPosts();
      }
  }

})
