import _ from 'lodash';
window._ = _;
import * as Popper from '@popperjs/core';
window.Popper = Popper;

import 'bootstrap';




import axios from 'axios';
window.axios = axios;
 window.axios.defaults.baseURL=process.env.APP_URL
    //  window.axios.defaults.baseURL="http://127.0.0.1:8000";


window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
