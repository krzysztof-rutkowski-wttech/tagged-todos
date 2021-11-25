import { ref, watch } from 'vue'
import { store } from '../store'

export default function() {
    const overlayOpened = ref(store.state.overlayOpened)

    watch(() => store.state.overlayOpened, () => {
      overlayOpened.value = store.state.overlayOpened
    })
    return { overlayOpened };
}
