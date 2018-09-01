new Vue({
  el: '#app',
  data: function () {
    return {
      formdata: {
        title: '',
        content: '',
        author: {
          name: ''
        },
        tags: []
      },
      tags: '',
      errors: null
    }
  },
  computed: {
    tagsArray: function () {
      this.formdata.tags = this.tags.split(',')
      return this.tags.split(',')
    }
  },
  methods: {
    onCreatePublication: function () {
      var v = this
      var formdata = this.formdata
      formdata.tags = this.tagsArray
      axios.post('http://localhost:3000/api/publications', formdata)
      .then(function (response) {
        v.errors = null
        if (response.data.errors) {
          v.errors = response.data.errors
        }
      }).catch(function (err) {
        console.error(err)
      });
    }
  }
});