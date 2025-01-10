const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://192.168.0.3:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((resp) => {
    return resp.data.data;
  });

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((resp) => {
    return resp.data.data;
  });

const getProducts = () =>
  axiosClient.get("/products?populate=*").then((resp) => {
    return resp.data.data;
  });

const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((resp) => {
      return resp.data.data;
    });

const registerUsers = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username,
    email,
    password,
  });

const SignIn = (email, password) =>
  axiosClient.post("/auth/local/", {
    identifier: email,
    password: password,
  });

const addToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

//user-carts?filters[userId][$eq]=${userId}&populate=product.images
const getCartItems = (userId, jwt) =>
  axiosClient
    .get(
      `/user-carts?filters[userId][$eq]=${userId}&populate=product.images
`,
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;
      const cartItemsList = data.map((item) => ({
        name: item.product?.name,
        quantity: item.quantity,
        amount: item.product?.sellingPrice * item.quantity,
        image: item.product?.images[0]?.url,
        actualPrice: item.product?.mrp,
        id: item.id,
      }));
      return cartItemsList;
    });

const deleteCartItem = (jwt, id) =>
  axiosClient.delete("/user-carts/" + id, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getProducts,
  getProductsByCategory,
  registerUsers,
  SignIn,
  addToCart,
  getCartItems,
  deleteCartItem,
};
