import { ref, watch } from 'vue'
import { store } from '@/store'

export default function() {
    const isLoading = ref(store.state.isLoading)

    watch(() => store.state.isLoading, () => {
      isLoading.value = store.state.isLoading
    })
    return { isLoading };
}
