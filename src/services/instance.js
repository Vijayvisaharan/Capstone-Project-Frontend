import axios from "axios";


//base url for the API
const baseURL='https://capstone-project-backend-1-5m2u.onrender.com';

//create an instance of axios with the base url
const axiosInstance = axios.create({
    baseURL: 'https://capstone-project-backend-1-5m2u.onrender.com',
    timeout: 120000, // Corrected property name
    headers: {
        'Content-Type': 'application/json',
    }
});

console.log(axiosInstance) ;
 const protectedInstance = axios.create({
    baseURL: 'https://capstone-project-backend-1-5m2u.onrender.com',
    time:5000,
    headers:{
        'Content-Type':'application/json',
        // 'Authorization':`Bearer ${localStorage.getItem('token')}`
    },
    withCredentials : true
 });
  export { baseURL,axiosInstance,protectedInstance}