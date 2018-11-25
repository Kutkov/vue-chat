<template>
  <div class="container chat">
    <h2 class="text-primary text-center">Real-Time Chat</h2>
    <h5 class="text-secondary text-center">Powered by Vue.js</h5>
    <div class="card">
      <div class="card-body">
        <p class="text-secondary nomessages" v-if="messages.length === 0">
          [No messages yet!]
        </p>
        <div class="messages" v-chat-scroll="{always: false, smooth: true}">
          <div 
            v-for="message in messages"
            :key="message.id"
            
          >
            <span class="text-info">[{{message.name}}]: </span>
            <span :id="message.id" @click="clickMessage">{{message.message}}</span>
            <span class="text-secondary time">{{message.timestamp}}</span>
          </div>
        </div>
      </div>
      <div class="card-action">
        <CreateMessage :name="name" />
      </div>
    </div>
    <UpdateMessage @newMessages="newMessageMethod" :id="target"></UpdateMessage>

  </div>
</template>

<script>
import CreateMessage from '@/components/CreateMessage'
import UpdateMessage from '@/components/UpdateMessage'
import fb from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'Chat',
  props: ['name'],
  components: {
    CreateMessage,
    UpdateMessage
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      target: ''
    }
  },
  methods: {
    newMessageMethod(data) {
      this.newMessage = data
    },
    clickMessage(target) {
      console.log('target = ', target, target.target.id)
      this.target = target.target.id
    }
  },
  created() {
    let ref = fb.collection('messages').orderBy('timestamp')

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          let doc = change.doc
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: moment(doc.data().timestamp).format('LTS')
          })

          // this.users.push({
          //   name: doc.data().name
          // })
        }
        if (change.type === "modified") {
          this.messages.forEach((test, index, arr) => {
            if(test.id === this.target) {
              arr[index].message = this.newMessage
            }
          })
            console.log("Modified city: ");
        }
        if (change.type === "removed") {
            console.log("Removed city: ");
        }
      })
    })

  }
}
</script>

<style>
  .chat h2{
    font-size: 2.6em;
    margin-bottom: 0px;
  }
  .chat h5{
    margin-top: 0px;
    margin-bottom: 40px;
  }
  .chat span{
    font-size: 1.2em;
  }
  .chat .time{
    display: block;
    font-size: 0.7em;
  }
  .messages{
    max-height: 300px;
    overflow: auto;
  }
</style>
