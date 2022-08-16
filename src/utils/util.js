import { getToken, removeToken } from '@/utils/auth'
import router from '@/router'
export function haveLocaStorage () {
  let user = localStorage.getItem("USER");
  if(user) return true;
  else{
    const hasToken = getToken();
    if(hasToken){
      let query = router.history.current.query;
      
      router.push({path:'/login',query:query});
    }
  }
}
