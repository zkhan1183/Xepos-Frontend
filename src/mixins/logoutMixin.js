import { ref, readonly , computed} from 'vue'

export default function useLogur() {
  const logout = () => { 
    if(localStorage.getItem('access_token')){
        localStorage.removeItem('access_token','')
    }
}

const isLoggedIn = computed(() => {
    if(localStorage.getItem('access_token')){
        return true;
    }else{
        false;
    }
})

  return {
    logout,
    isLoggedIn
  }
}