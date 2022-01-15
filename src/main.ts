import { createApp } from 'vue'
import { store, key } from './store'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faAngleLeft,
    faCheckCircle,
    faDotCircle,
    faPlayCircle,
    faTrashAlt,
    faBars,
    faEdit,
    faPlusCircle,
} from '@fortawesome/free-solid-svg-icons'
// import {  } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import OverlayLayout from './views/OverlayLayout.vue'

library.add(faAngleLeft, faCheckCircle, faDotCircle, faPlayCircle, faTrashAlt, faBars, faEdit, faPlusCircle)

createApp(App)
    .use(router)
    .use(store, key)
    .component('icon', FontAwesomeIcon)
    .component('overlay-layout', OverlayLayout)
    .mount('#app')
