import { Store } from 'vuex'
import { Router, RouteLocationNormalizedLoaded } from "vue-router";

declare module '@vue/runtime-core' {
  interface State {
    count: number
  }
  interface ComponentCustomProperties {
    $store: Store<State>,
    $router: Router,
    $route: RouteLocationNormalizedLoaded
  }
}
