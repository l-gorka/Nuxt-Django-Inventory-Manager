export const state = () => ({
	isUserAdmin: false,
	snackbarVisible: false,
	snackbarColor: '',
	snackbarText: '',
});

export const mutations = {
	SET_SNACKBAR(state, {isVisible, color, text}) {
		state.snackbarVisible = isVisible,
		state.snackbarColor = color
		state.snackbarText = text		
	},
	SNACKBAR_SHOW(state, isVisible) {
		state.snackbarVisible = isVisible
	},
	SET_USER_ROLE(state, isAdmin) {
		state.isUserAdmin = isAdmin
	}
};

export const actions = {
	GET_USER_ROLE({commit}) {
		this.$axios.get('user/me/')
		.then((response) => {
			commit('SET_USER_ROLE', response.data.is_staff)
		})
		.catch((error) => {
			commit('SET_SNACKBAR', {isVisible: true, color: 'error', text: 'Problem fetching user permissions'})
		})
	}
}