<template>
  <v-form v-model="formValid" @submit.prevent="submitForm">
    <v-text-field
      validate-on-blur
      name="username"
      label="username"
      id="username"
      :rules="[required('name'), minLength('username', 3)]"
      v-model="userInfo.username"
    ></v-text-field>
    <v-text-field
      validate-on-blur
      name="email"
      label="email"
      type="email"
      id="email"
      :rules="[required('email'), isEmail('Email')]"
      v-model="userInfo.email"
      v-if="email"
    ></v-text-field>
    <v-text-field
      :append-icon="isPasswordVisible? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="isPasswordVisible = !isPasswordVisible"
      @keyup.enter="submitForm"
      :type="isPasswordVisible? 'text' : 'password'"
      label="password"
      id="password"
      v-model="userInfo.password"
    ></v-text-field>
    <v-btn :loading="isLoading" :disabled="!formValid" @click="submitForm()" color="success">{{ buttonLabel }}</v-btn>
  </v-form>
</template>

<script>
import validators from '../utils/validators';
export default {
	props: ['email', 'buttonLabel', 'email', 'isLoading'],
	data() {
		return {
			formValid: true,
			isPasswordVisible: false,
			userInfo: {
				username: '',
				password: '',
			},
			...validators
		};
	},
	methods: {
		submitForm() {
			if (this.formValid) {
				this.$emit('submitForm', this.userInfo);
			}

		}
	}
}
</script>

<style>
</style>