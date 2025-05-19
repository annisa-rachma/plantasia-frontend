import { PRODUCTS_FETCH, PRODUCT_DELETE, PRODUCT_FETCH_BY_ID, PRODUCT_PUT, PRODUCT_POST } from "./actionType";
import { BASE_URL } from "./base_url";

export function productsFetchSuccess(payload) {
    return {type : PRODUCTS_FETCH, payload : payload}
}

export function fetchProducts() {
    return async function (dispatch) {
        try {
          const res = await fetch( BASE_URL + "/products", {
            headers: {
                access_token: localStorage.access_token,
            },
          });
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


export function productFetchByIdSuccess(payload) {
    return {type : PRODUCT_FETCH_BY_ID, payload : payload}
}

export function fetchProductById(id) {
    return async function(dispatch) {
        try {
            // console.log('<<<sebelum fetch')
            const res = await fetch(`${BASE_URL}/products/${id}`, {
              headers: {
                  access_token: localStorage.access_token,
              },
            });
            const data = await res.json();
            if (!res.ok) {
              throw data;
            }
            // console.log(data, '<<<<< dari action')
            dispatch(productFetchByIdSuccess(data))
          } catch (error) {
            throw error;
          }
    }
}

export function addProductSuccess(payload) {
  return { type: PRODUCT_POST, payload: payload };
}

export function handleAddProduct(payload) {
  return async function (dispatch) {
    try {
      const res = await fetch(BASE_URL + "/products", {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      dispatch(fetchProducts())
    } catch (error) {
      throw error;
    }
  };
}

export function deleteProductSuccess(payload) {
  return { type: PRODUCT_DELETE, payload: payload };
}

export function handleDeleteProduct(id) {
  return async function (dispatch) {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "delete",
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const data = await res.json();
      if (!res.ok) throw data;
      dispatch(fetchProducts())
      // console.log("berhasil delete")
      return data;
    } catch (error) {
      throw error;
    }
  };
}

export function editProductSuccess(payload) {
  return { type: PRODUCT_PUT, payload: payload };
}

export function handleEditProduct(payload, id) {
  return async function (dispatch) {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "put",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      dispatch(fetchProducts())
    } catch (error) {
      throw error;
    }
  };
}