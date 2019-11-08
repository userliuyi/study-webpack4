import Vuex from 'vuex';
import Vue from 'vue';
import tool from 'utils/http';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 用户信息
        userInfo: {
            username: '用户',
            id: ''
        }
    },
    mutations: {
        'user/updateUserInfo' (state, userInfo) {
            state.userInfo = userInfo;
        },
    },
    actions: {
        'user/fetchUserInfo' ({ commit }) {
            return new Promise((resolve, reject) => {
                tool({
                    url: '/skynet/userInfo'
                },{
                    noAbort: true
                }).then((result) => {
                    commit('user/updateUserInfo', result.data);
                    resolve(result.data);
                }).catch(() => {
                    reject();
                });
            });
        },
    },

    modules: {

    }
});
export default store;
