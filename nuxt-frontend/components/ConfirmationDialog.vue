<template>
  <v-dialog
    @keydown.enter="confirm"
    :value="isOpen"
    @input="$emit('cancel')"
    width="500"
  >
    <v-card >
      <v-card-title class="text-h5">{{ title }}</v-card-title>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel" text color="error">Cancel</v-btn>
        <v-btn color="primary" text @click="confirm">{{ confirmLabel }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
	props: ['title', 'text', 'confirmLabel', 'isOpen'],
	data() {
		return {
			open: false,
		};
	},
	methods: {
		cancel() {
			this.$emit('cancel');
		},
		confirm() {
			this.$emit('confirm');
		}
	}
}
</script>

<style>
</style>