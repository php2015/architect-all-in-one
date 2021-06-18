<template>
  <div id="app">
    {{this.$store.state.name}}
    {{this.$store.state.age}}
    <button @click="$store.state.age++">更改年龄</button>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
</style>
