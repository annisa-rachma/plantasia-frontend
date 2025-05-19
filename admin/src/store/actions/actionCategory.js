import { CATEGORIES_FETCH, CATEGORY_DELETE, CATEGORY_FETCH_BY_ID, CATEGORY_POST, CATEGORY_PUT } from "./actionType";
import { BASE_URL } from "./base_url";

export function categoriesFetchSuccess(payload) {
    return {type : CATEGORIES_FETCH, payload : payload}
}

export function fetchCategories() {
    return async function (dispatch) {
        try {
          const res = await fetch(BASE_URL + "/categories", {
            headers: {
                access_token: localStorage.access_token,
            },
          });
          const data = await res.json();
          if (!res.ok) {
            throw data;
          }
          dispatch(categoriesFetchSuccess(data));
        } catch (error) {
            throw error;
        }
      }
}

export function categoryFetchByIdSuccess(payload) {
  return {type : CATEGORY_FETCH_BY_ID, payload : payload}
}

export function fetchCategoryById(id) {
  return async function(dispatch) {
      try {
          const res = await fetch(`${BASE_URL}/categories/${id}`, {
            headers: {
                access_token: localStorage.access_token,
            },
          });
          const data = await res.json();
          if (!res.ok) {
            throw data;
          }
          dispatch(categoryFetchByIdSuccess(data))
        } catch (error) {
          throw error;
        }
  }
}

export function addCategorySuccess(payload) {
  return { type: CATEGORY_POST, payload: payload };
}

export function handleAddCategory(payload) {
  return async function (dispatch) {
    try {
      const res = await fetch(BASE_URL + "/categories", {
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
      dispatch(fetchCategories())
    } catch (error) {
      throw error;
    }
  };
}

export function editCategorySuccess(payload) {
  return { type: CATEGORY_PUT, payload: payload };
}

export function handleEditCategory(payload, id) {
  return async function (dispatch) {
    try {
      const res = await fetch(`${BASE_URL}/categories/${id}`, {
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
      dispatch(fetchCategories())
    } catch (error) {
      throw error;
    }
  };
}

export function deleteCategorySuccess(payload) {
  return { type: CATEGORY_DELETE, payload: payload };
}

export function handleDeleteCategory(id) {
  return async function (dispatch) {
    try {
      const res = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "delete",
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const data = await res.json();
      if (!res.ok) throw data;
      dispatch(fetchCategories())
      return data;
    } catch (error) {
      throw error;
    }
  };
}