<template>
  <v-app>
    <v-main>
      <Main />
    </v-main>
  </v-app>
</template>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>

<script>
import Main from './components/Main';

export default {
  name: 'App',

  components: {
    Main,
  },

  data: () => ({
    //
  }),
};
</script>
