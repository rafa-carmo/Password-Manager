import axios from 'axios';
export function getPasswords(ctx: any) {
    axios.interceptors.request.use(
        (config) => {
          if (this.isUserLoggedIn()) {
            config.headers.authorization = token
          }
          return config
        }
}
