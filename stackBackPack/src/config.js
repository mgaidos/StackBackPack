export const USER_DASHBOARD_URL = import.meta.env.PROD ? 'https://stackbackpack.onrender.com/dashboard' : 'http://localhost:8000/dashboard'

export const MY_LIST_URL = import.meta.env.PROD ? 'https://stackbackpack.netlify.app/my-list' : 'http://127.0.0.1:5173/my-list'

export const LOGIN_URL = import.meta.env.PROD ? 'https://stackbackpack.onrender.com/login' : 'http://localhost:8000/login'

export const REGISTER_URL = import.meta.env.PROD ? 'https://stackbackpack.onrender.com/register' : 'http://localhost:8000/register'

export const HOME_IMAGE_SRC = import.meta.env.PROD ? './assets/stb-mini.png' : './src/assets/stb-mini.png'