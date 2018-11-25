<template>
  <div class="container">
    <form @submit.prevent="updateMessage">
      <div class="form-group">
        <input type="text" name="message" class="form-control" placeholder="Enter message ..." v-model="newMessage">
      </div>
      <button class="btn btn-primary" type="submit" name="action">Submit</button>
    </form>
  </div>
</template>

<script>
import fb from '@/firebase/init'

export default {
  props: ['id'],
  data() {
    return {
      newMessage: null
    }
  },
  methods: {
    updateMessage () {
      console.log('this.target', this.id)
      let washingtonRef = fb.collection("messages").doc(this.id)
      washingtonRef.update({
          message: this.newMessage
      })
      this.$emit('newMessages', this.newMessage )
    }
  } 
}
</script>
