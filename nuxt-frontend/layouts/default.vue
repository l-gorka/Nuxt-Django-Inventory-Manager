<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container class="">
        <nuxt />
      </v-container>
    </v-main>
    <v-snackbar app top v-model="showSnackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="snackbarColor" text v-bind="attrs" @click="showSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
	components: { Navbar },
	computed: {
		snackbarColor() {
			return this.$store.state.snackbarColor;
		},
		snackbarText() {
			return this.$store.state.snackbarText;
		},
		showSnackbar: {
			get() {
				return this.$store.state.snackbarVisible;
			},
			set(v) {
				this.$store.commit('SNACKBAR_SHOW', v);
			}
		}
	}
}
</script>

<style>
.container {
	max-width: 1300px;
}
</style>