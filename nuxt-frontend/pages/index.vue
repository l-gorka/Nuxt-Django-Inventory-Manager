<template>
  <div class="page-wrapper ma-1">
		<h1 class="display-2 mt-4 mt-md-10">Manage items</h1>
    <div class="my-4 my-md-10">
      <v-row class="d-flex align-center">
        <v-col cols="12" md="8" lg="5">
          <SearchInput class @searchTermUpdated="searchTermUpdated" />
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-end">
          <PenDialog @pensUpdated="fetchData" create="true" label="Add a new pen" />
        </v-col>
      </v-row>
    </div>
    <div>
      <p class>Number of results: {{totalItems}}</p>
      <v-row class="mb-10" v-if="filteredPens">
        <v-col
          class="pa-1 pa-sm-2 pa-lg-3"
          v-for="pen in paginated"
          :key="pen.id"
          cols="6"
          sm="4"
          md="3"
        >
          <PenCard :pen="pen" @pensUpdated="fetchData" />
        </v-col>
      </v-row>
    </div>
    <div></div>
    <div class="index-pagination">
      <div class="text-center mb-10">
        <v-pagination fab :length="totalPages" v-model="page"></v-pagination>
      </div>
    </div>
  </div>
</template>


<script>
import PenCard from "../components/PenCard.vue";
import SearchInput from "../components/SearchInput.vue";
export default {
	components: { PenCard, SearchInput },
	data() {
		return {
			pens: [],
			page: 1,
			numPerPage: 8,
			filteredPens: [],
			paginatedPens: [],
			searchTerm: ''
		};
	},
	mounted() {
		if (this.$auth.loggedIn) {
			this.$store.dispatch('GET_USER_ROLE')
			this.fetchData();
		} else {
			this.$router.push('/login')
		}
		
	},
	computed: {
		totalItems() {
			return this.filter().length;
		},
		totalPages() {
			return Math.ceil(this.totalItems / this.numPerPage);
		},
		paginated() {
			return this.filter().slice((this.page - 1) * this.numPerPage, this.page * this.numPerPage);
		}
	},
	methods: {
		filter() {
			return this.pens.filter((pen) => {
				return pen.name.toLowerCase().includes(this.searchTerm.toLowerCase());
			});
		},
		searchTermUpdated(term) {
			//when filterimg, always redirect user to 1st page of results
			this.page = 1;
			this.searchTerm = term;
		},
		fetchData() {
			this.$axios.get('api/pens/')
				.then((response) => {
					this.pens = response.data;
					// reverse the list so it will display items in order of last updated
					this.pens = this.pens.reverse()
				})
				.catch((error) => {
					// get custom error message from response.body
					this.$store.commit('SET_SNACKBAR', {
						isVisible: true,
						color: 'error',
						text: error.response.data[Object.keys(error.response.data)[0]].toString() || 'There was a problem with connection.'
					});
				});
		}
	}
}
</script>

<style>
.page-wrapper {
	display: flex;
	flex-direction: column;
	min-height: 90vh;
}
.index-pagination {
	margin-top: auto;
}
</style>