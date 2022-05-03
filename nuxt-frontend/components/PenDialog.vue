<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.xsOnly" v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn :disabled="createDisabled" v-if="create" dark v-bind="attrs" v-on="on">
        <v-icon left>mdi-plus-circle</v-icon>Add pen
      </v-btn>
      <v-btn v-else dark v-bind="attrs" v-on="on" icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 pa-4">{{label}}</v-card-title>
      <v-divider></v-divider>
      <div class="pa-4">
        <v-form>
          <v-text-field
            validate-on-blur
            :rules="[required('name'), minLength('name', 3)]"
            name="name"
            v-model="penData.name"
            label="Name"
            id="id"
          ></v-text-field>
          <v-text-field
            validate-on-blur
            :rules="[isNumber('amount')]"
            name="amount"
            type="number"
            v-model.number="penData.amount"
            label="Amount"
            id="id"
          ></v-text-field>
          <v-file-input accept="image/*" v-model="imageFile" label="Photo">asd</v-file-input>
        </v-form>
        <v-img max-height="200" max-width="200" :src="imagePreview" />
      </div>
      <v-divider></v-divider>
      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn text class="mr-2" color="error" @click="dialog = false">Cancel</v-btn>
        <v-btn
          text
          color="success"
          :loading="isLoading"
          @click="uploadData"
        >{{ create? 'Create' : 'Update'}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import validators from '../utils/validators';
export default {
	props: ['create', 'label', 'pen'],
	data() {
		return {
			...validators,
			imagePreview: '',
			imageFile: [],
			dialog: false,
			isLoading: false,
			penData: {
				name: '',
				amount: null,
			}
		};
	},
	computed: {
		// if user is not admin, disable item creation
		createDisabled() {
			return !(this.$store.state.isUserAdmin);
		}
	},
	async mounted() {
		// if user wants to edit existing pen, load data from props
		if (this.pen) {
			this.penData.name = this.pen.name;
			this.penData.amount = this.pen.amount;

			// convert url to file
			if (this.pen.image) {
				let name = this.pen.image.split('/');
				name = name.slice(name.length - 1);
				let blob = await fetch(`https://res.cloudinary.com/dgmcox/${this.pen.image}`).then(r => r.blob());
				this.imageFile = new File([blob], name);
			}
		}
	},
	watch: {
		// if file input value is changed, refresh preview
		imageFile() {
			if (!this.imageFile) {
				this.imagePreview = null;
			} else {
				if (typeof this.imageFile === 'string') {
					this.imagePreview = `https://res.cloudinary.com/dgmcox/${this.pen.image}`;
				} else if (typeof this.imageFile === 'object') {
					this.imagePreview = URL.createObjectURL(this.imageFile);
				}
			}
		}
	},
	methods: {
		async uploadData() {
			// create or update, based on props
			this.isLoading = true;
			if (this.create) {
				await this.createPen();
			} else {
				await this.updatePen();
			}
		},
		createPen() {
			let data = new FormData();
			data.append('name', this.penData.name);
			data.append('amount', this.penData.amount);
			if (this.imageFile) {
				data.append('image', this.imageFile);
			}
			this.$axios.post('/api/pens/', data, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			})
				.then((response) => {
					this.dialog = false;
					this.$store.commit('SET_SNACKBAR', { isVisible: true, color: 'success', text: 'Item has been created' });
					this.$emit('pensUpdated');
					this.penData = {};
					this.imageFile = false;
				})
				.catch((error) => {

					this.$store.commit('SET_SNACKBAR', {
						isVisible: true,
						color: 'error',
						text: 'There was a problem creating the item'
					});
				})
				.finally(() => this.isLoading = false);

		},
		updatePen() {
			let data = new FormData();
			data.append('name', this.penData.name);
			data.append('amount', this.penData.amount);

			data.append('image', this.imageFile);

			this.$axios.put(`/api/pens/${this.pen.id}/`, data, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			})
				.then((response) => {
					this.dialog = false;
					this.$store.commit('SET_SNACKBAR', { isVisible: true, color: 'success', text: 'Item has been updated' });
					this.$emit('pensUpdated');
				})
				.catch((error) => {
					this.$store.commit('SET_SNACKBAR', {
						isVisible: true,
						color: 'error',
						text: 'There was a problem updating the item'
					});
				})
				.finally(() => this.isLoading = false);
		}
	}
}
</script>

<style>
</style>