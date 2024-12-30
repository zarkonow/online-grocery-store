const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://192.168.0.2:1337/api",
});

const getCategory = () =>axiosClient.get("/categories?populate=*")



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


const registerUsers = (username, email, password) => axiosClient.post("/auth/local/register", {
  username,
  email,
  password
})

const SignIn =(email, password) => axiosClient.post("/auth/local/",{
  identifier: email,
  password: password
})

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getProducts,
  getProductsByCategory,
  registerUsers,
  SignIn
};
