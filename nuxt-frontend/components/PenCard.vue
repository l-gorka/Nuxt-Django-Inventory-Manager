<template>
  <v-card class="rounded-lg">
    <v-img class="white--text text-right align-end" :src="imageUrl" max-height="250"></v-img>
    <v-card-title primary-title>{{pen.name}}</v-card-title>
    <v-card-subtitle>Amount: {{pen.amount}}</v-card-subtitle>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <PenDialog label="Update existing pen" @pensUpdated="pensUpdated" :pen="pen" />
      <v-btn :disabled="deleteDisabled" @click="isConfirmationOpen = true" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
    <ConfirmationDialog
      title="Are you sure you want to delete this item?"
      :isOpen="isConfirmationOpen"
      confirmLabel="Delete"
      @confirm="penDelete"
      @cancel="isConfirmationOpen = false"
    />
  </v-card>
</template>

<script>
import ConfirmationDialog from "./ConfirmationDialog.vue";
import PenDialog from "./PenDialog.vue";
export default {
	components: { PenDialog, ConfirmationDialog },
	props: ['pen'],
	data() {
		return {
			isConfirmationOpen: false
		};
	},
	computed: {
		imageUrl() {
			if (!this.pen.image || this.pen.image === 'image/upload/null') {
				return 'https://res.cloudinary.com/dgmcox/image/upload/c_thumb,h_400,w_400/v1651315952/pens/no_photo_ryemhi.png';
			}
			// modify url to get padded image from cloudinary
			let paddedImage = this.pen.image.replace('image/upload/', 'image/upload/c_lpad,w_400,h_400,b_rgb:1e1e1e/');
			return `https://res.cloudinary.com/dgmcox/${paddedImage}`;
		},
		deleteDisabled() {
			return !this.$store.state.isUserAdmin;
		}
	},
	methods: {
		pensUpdated() {
			this.$emit('pensUpdated');
		},
		penDelete() {
			this.$axios.delete(`/api/pens/${this.pen.id}/`)
				.then(() => {
					this.$store.commit('SET_SNACKBAR', { isVisible: true, color: 'success', text: 'Item has been deleted' });
					this.$emit('pensUpdated');
				});
		}
	}
}
</script>

<style>
</style>