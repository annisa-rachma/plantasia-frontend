import { PRODUCTS_FETCH, PRODUCT_FETCH_BY_ID } from "./actionType";
import { BASE_URL } from "./base_url";

//fetch products
export function productsFetchSuccess(payload) {
    return {type : PRODUCTS_FETCH, payload : payload}
}

export function fetchProducts(queryString = "") {
    return async function (dispatch) {
        try {
          const res = await fetch(BASE_URL + `/products${queryString}`);
          const data = await res.json();
          if (!res.ok) {
            throw data;
          }
          dispatch(productsFetchSuccess(data));
        } catch (error) {
            throw error;
        }
      }
}

//fetch products by id
export function productFetchByIdSuccess(payload) {
    return {type : PRODUCT_FETCH_BY_ID, payload : payload}
}

export function fetchProductById(id) {
    return async function(dispatch) {
        try {
            const res = await fetch(`${BASE_URL}/products/${id}`);
            const data = await res.json();
            if (!res.ok) {
              throw data;
            }
            dispatch(productFetchByIdSuccess(data))
          } catch (error) {
            throw error;
          }
    }
}