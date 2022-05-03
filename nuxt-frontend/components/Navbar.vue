<template>
  <nav>
    <v-app-bar dense>
      <v-app-bar-title>
        <span class="font-weight-light">pen</span>
        <span>stash</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-md-block">
        <div v-if="isLoggedIn" class="d-flex">
          <v-btn disabled text>Hello, {{username}}</v-btn>
          <v-btn @click="isConfirmationOpen = true" text>Logout</v-btn>
        </div>
        <div v-else class="d-flex">
          <nuxt-link to="/register">
            <v-btn text>Register</v-btn>
          </nuxt-link>
          <nuxt-link to="/login">
            <v-btn text>Login</v-btn>
          </nuxt-link>
        </div>
      </div>
      <div class="d-block d-md-none">
        <v-app-bar-nav-icon @click="isDrawerVisible = !isDrawerVisible" />
      </div>
    </v-app-bar>
    <v-navigation-drawer disable-resize-watcher right class="pa-2" app v-model="isDrawerVisible">
      <v-list dense nav>
        <div v-if="isLoggedIn">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">Hello, {{username}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="isConfirmationOpen = true" link>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-else>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">Pen stash</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <nuxt-link to="/register">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Register</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
          <nuxt-link to="/login">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
        </div>
      </v-list>
    </v-navigation-drawer>
    <ConfirmationDialog
      :isOpen="isConfirmationOpen"
      title="Are you sure you want to logout?"
      confirmLabel="Logout"
      @confirm="logout"
      @cancel="isConfirmationOpen = false"
    />
  </nav>
</template>

<script>
export default {
	data() {
		return {
			isDrawerVisible: false,
			isConfirmationOpen: false,
		};
	},
	computed: {
		isLoggedIn() {
			return this.$auth.loggedIn;
		},
		username() {
			return this.$auth.user;
		},
	},
	methods: {
		async logout() {
			await this.$auth.logout();
      this.$router.push('/login');
			this.isConfirmationOpen = false;
			this.$store.commit('SET_SNACKBAR', { isVisible: true, color: 'success', text: 'You have logged out successfully' });
			
		}
	}
}
</script>

<style>
</style>