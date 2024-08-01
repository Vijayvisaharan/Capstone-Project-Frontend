import { axiosInstance, protectedInstance } from "./instance";

const userServices = {
    // register user
    registerUser: async (firstName, lastName, email, password, role) => {
        // const allowedRoles = ['user', 'admin'];
        // if (!allowedRoles.includes(role)) {
        //     return { error: 'Invalid role provided' };
        // }
        try {
            const response = await axiosInstance.post('/api/users/register', {
                firstName,
                lastName,
                email,
                password,
                role,
            }
            )
            return response.data
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Registration error:', error);

            // Check if error response exists and handle accordingly
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server responded with status:', error.response.status);
                console.error('Response data:', error.response.data);
                return { error: error.response.data.message || 'Server error occurred' };
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                return { error: 'No response received from the server' };
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up request:', error.message);
                return { error: error.message || 'An unknown error occurred' };
            }
        }
    },
    // login user
    loginUser: async (email, password) => {
        try {
            const response = await protectedInstance.post('/api/users/login', {
                email,
                password
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    // get user profile
    getUserProfile: async () => {
        try {
            const response = await protectedInstance.get('/api/users/getCurrentuser', {
                withCredentials: true
            });
            return response.data.user;
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    },
    // logout user
    logoutUser: async () => {
        try {
            const response = await protectedInstance.post('/api/users/logout', {}, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
}




export default userServices