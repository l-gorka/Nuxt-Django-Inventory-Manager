<template>
  <v-text-field
    prepend-inner-icon="mdi-magnify"
    name="name"
    label="filter"
    id="filter"
    v-model="searchTerm"
    @input="$emit('searchTermUpdated', searchTerm)"
  ></v-text-field>
</template>

<script>
export default {
	data() {
		return {
			searchTerm: ''
		};
	}
}
</script>

<style>
</style>