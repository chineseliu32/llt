
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
	}, 
	mutations: {
		login(state, provider) {
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
                key: 'userInfo'
            })
			uni.removeStorage({
                key: 'accessToken'
            })
			uni.removeStorage({
			    key: 'userNum'
			})
		}
	},
	actions: {
	}
})

export default store
