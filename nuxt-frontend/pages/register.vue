<template>
  <div class="container">
    <v-row justify="center" align="center" class="row mt-16">
      <v-col cols="12" md="8">
        <h1>Register</h1>
        <UserForm
          :isLoading="isLoading"
          buttonLabel="Register"
          email="true"
          @submitForm="registerUser"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserForm from "../components/UserForm.vue";
export default {
	components: { UserForm },
	data() {
		return {
			isLoading: false,
			valid: true,
		};
	},
	methods: {

		registerUser(userData) {
			this.isLoading = true;
			let res = this.$axios.post('/auth/users/', userData)
				.then((response) => {
					this.$router.push('/login');
					this.$store.commit('SET_SNACKBAR', { isVisible: true, color: 'success', text: 'User registered successfully' });
				})
				.catch((error) => {
					// get custom error message from response.body
					this.$store.commit('SET_SNACKBAR', {
						isVisible: true,
						color: 'error',
						text: error.response.data[Object.keys(error.response.data)[0]].toString() || 'There was a problem with registrtion.'
					});
				})
				.finally(() => this.isLoading = false);
		}
	},

}
</script>

<style>
</style>