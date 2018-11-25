<template>
  <div class="container">
    <div v-for="user of users" :key="user.id">
      <h3>test mes: {{user.name}}</h3>
      <!-- <span class="color">{{color}}</span> -->
    </div>
    <button></button>
  </div>
</template>

<script>
export default {
  props: ['users']
}
</script>
