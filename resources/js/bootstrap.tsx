import axios from 'axios';

(window as any).axios = axios;

(window as any).axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
