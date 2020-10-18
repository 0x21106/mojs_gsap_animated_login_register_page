
import { Utils } from './utils.js';
import { PreloaderUtils } from './preloaderUtils.js';

let utils
let preloader

document.addEventListener('DOMContentLoaded', () => {
      const changeToLoginButton = document.querySelector("#change-to-login-view")
      const changeToRegisterButton = document.querySelector("#change-to-register-view")

      utils = new Utils()
      preloader = new PreloaderUtils()
      preloader.init()
      changeToLoginButton.addEventListener('click', () => utils.changeView(utils.views.login_view))
      changeToRegisterButton.addEventListener('click', () => utils.changeView(utils.views.register_view))
})

window.addEventListener('load', () => {
      setTimeout(() => {
            utils.hidePreloader().then(() => {
                  utils.init()
            })
      }, 1000)
})