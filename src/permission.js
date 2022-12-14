import router from './router'
import { getToken } from '@/utils/auth' // get token from cookie


const whiteList = ['/login', '/404'] // no redirect whitelist
// const whiteList = [] // no redirect whitelist


router.beforeEach(async(to, from, next) => {
  // start progress bar

  // set page title

  // determine whether the user has logged in
  const hasToken = getToken()

  // console.log(hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      localStorage.clear();
      // if is logged in, redirect to the home page
      // next({ path: '/' })
      next()
    } else {
      next()
      // const hasGetUserInfo = store.getters.name
      // if (hasGetUserInfo) {
      //   next()
      // } else {
      //   try {
      //     // get user info
      //     // await store.dispatch('user/getInfo')
      //     next()
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // alert("token没有了，所以跳登录页")
      // other pages that do not have permission to access are redirected to the login page.
      // next()
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
})
