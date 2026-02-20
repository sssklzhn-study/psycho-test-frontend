// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Добавляем userId в заголовки для авторизации
// API.interceptors.request.use((config) => {
//   const userId = localStorage.getItem('userId');
//   if (userId) {
//     config.headers['X-User-Id'] = userId;
//   }
//   return config;
// });

// // Логирование запросов для отладки
// API.interceptors.request.use((config) => {
//   console.log(`📤 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, config.data || '');
//   return config;
// });

// API.interceptors.response.use(
//   (response) => {
//     console.log(`📥 ${response.status} ${response.config.url}`, response.data);
//     return response;
//   },
//   (error) => {
//     console.error('❌ Ошибка API:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default API;
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем userId в заголовки для авторизации
API.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    config.headers['X-User-Id'] = userId;
  }
  return config;
});

// Логирование запросов для отладки (только в development)
if (process.env.NODE_ENV === 'development') {
  API.interceptors.request.use((config) => {
    console.log(`📤 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, config.data || '');
    return config;
  });

  API.interceptors.response.use(
    (response) => {
      console.log(`📥 ${response.status} ${response.config.url}`, response.data);
      return response;
    },
    (error) => {
      console.error('❌ Ошибка API:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );
}

export default API;