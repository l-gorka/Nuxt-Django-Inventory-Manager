<template>
  <div class="container">
    <v-row justify="center" align="center" class="row mt-16">
      <v-col cols="12" md="8">
        <h1>Login</h1>
        <UserForm :isLoading="isLoading" buttonLabel="Login" @submitForm="loginUser" />
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
		loginUser(userData) {
			this.isLoading = true;
			let response = this.$auth.loginWith('local', {
				data: userData,
			}).then((response) => {
				this.$store.commit('SET_SNACKBAR', { isVisible: true, color: 'success', text: 'Logged in' });
			})
				.catch((error) => {
					// get custom error message from response.body
					this.$store.commit('SET_SNACKBAR', {
						isVisible: true,
						color: 'warning',
						text: error.response.data[Object.keys(error.response.data)[0]].toString() || 'There was a problem with login'
					});
				})
				.finally(() => this.isLoading = false);

		},
	}
}
</script>

<style>
</style>