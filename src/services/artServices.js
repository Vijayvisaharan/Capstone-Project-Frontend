import { axiosInstance, protectedInstance } from "./instance";

const artServices = {
    getArt: async (id) => {
        try {
            const response = await protectedInstance.get(`/api/arts/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getAllArts: async () => {
        try {
            const response = await axiosInstance.get("/api/arts/all");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    createArt: async (title, description, price, category, artist, images, location, status) => {
        try {
            const response = await protectedInstance.post("/api/arts/create", {
                title,
                description,
                price,
                category,
                artist,
                images,
                location,
                status,
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    updateArt: async (id, title, description, price, category, artist, images, location) => {
        try {
            const response = await protectedInstance.put(`/api/arts/${id}`, {
                title,
                description,
                price,
                category,
                artist,
                images,
                location,

            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    deleteArt: async (id) => {
        try {
            const response = await protectedInstance.delete(`/api/arts/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    addTocart: async (artId) => {
        try {
            const response = await protectedInstance.post(`/api/arts/${artId}/add`);
            return response.data;
        } catch (error) {
            console.error('Error adding item to cart:', error)
        }
    },
    getCart: async () => {
        try {
            const response = await protectedInstance.get(`/api/arts/cart`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    updateQuantity: async (artId, quantity) => {
        try {
            const response = await protectedInstance.put(`/api/arts/cart/${artId}`, { quantity });
            return response.data;
        } catch (error) {
            console.error('Error updating quantity:', error);
            throw error;
        }
    },
    removeFromCart: async (artId) => {
        try {
            const response = await protectedInstance.delete(`/api/arts/cart/${artId}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    searchByCategory: async (query) => {
        try {
            const response = await axiosInstance.get('/api/arts/search', {
                params: { query }
            });

            return response;

        } catch (error) {
            console.error('Error fetching arts by category:', error);
            return [];
        }
    },
    getCartTotal: async () => {
        try {
            const response = await protectedInstance.get(`/api/arts/cart/total`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
}
export default artServices;
