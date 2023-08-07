import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { BASE_URL, LIMIT } from "../utils/consts";
import $axios from "../utils/axios";
import { useSearchParams } from "react-router-dom";

const productContext = createContext();

export function useProductContext() {
  return useContext(productContext);
}

const initState = {
  products: [],
  oneProduct: null,
  categories: [],
  totalPages: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "products":
      return { ...state, products: action.payload };
    case "oneProduct":
      return { ...state, oneProduct: action.payload };
    case "categories":
      return { ...state, categories: action.payload };
    case "totalPages":
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
}

const ProductContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(+searchParams.get("page") || 1);

  async function getProducts() {
    try {
      const { data } = await $axios.get(
        `${BASE_URL}/products/${window.location.search}`
      );

      const totalCount = Math.ceil(data.count / LIMIT);

      dispatch({
        type: "totalPages",
        payload: totalCount,
      });

      dispatch({
        type: "products",
        payload: data.results,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function getOneProduct(id) {
    try {
      const { data } = await $axios.get(`${BASE_URL}/products/${id}/`);

      console.log(data, "data");
      dispatch({
        type: "oneProduct",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function createProduct(product) {
    try {
      console.log(product);
      const { data } = await $axios.post(`${BASE_URL}/products/`, product);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    try {
      await $axios.delete(`${BASE_URL}/products/${id}/`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  async function editProduct(id, newData) {
    try {
      await $axios.patch(`${BASE_URL}/products/${id}/`, newData);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategories() {
    try {
      const { data } = await $axios.get(`${BASE_URL}/categories/`);
      dispatch({
        type: "categories",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const value = {
    products: state.products,
    oneProduct: state.oneProduct,
    categories: state.categories,
    totalPages: state.totalPages,
    getProducts,
    createProduct,
    getCategories,
    deleteProduct,
    editProduct,
    getOneProduct,
    page,
    setPage,
  };
  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
};

export default ProductContext;
