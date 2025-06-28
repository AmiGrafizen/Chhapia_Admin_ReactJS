import {
    ApiGet,
    ApiPostData,
    ApiPut,
} from '../../helper/axios';
import { GET_USERS,  GET_CONTACT_US, LOGIN_ADMIN, GET_USER_BY_ID, GET_CUSTOMERS, } from '../type';


export const getAllUserAction = () => {
    return (dispatch) => {
        return ApiGet(`/auth/all-users`)
      .then((res) => {
        console.log('res', res);
        if (res.users) {
          dispatch({
            type: GET_USERS,
            payload: res.users,
          });
          return res.users;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_USERS,
          payload: error,
        });
      });
  };
};

export const getContactUsAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/contact-us`)
    .then((res) => {
      console.log('res', res)
      if (res.contacts) {
        dispatch({
          type: GET_CONTACT_US,
          payload: res.contacts,
        });
        return res.contacts;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_CONTACT_US,
        payload: error,
      });
    });
};
};


export const loginAdminAction = (userData) => {
  return (dispatch) => {
      return ApiPostData(`/auth/user/login`, userData)
    .then((res) => {
      console.log("dsfsf",res)
      if (res.user) {
        dispatch({
          type: LOGIN_ADMIN,
          payload: res.user,
        });
        return res.user;
      }
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_ADMIN,
        payload: error,
      });
      return error;
    });
};
};

export const updateUserAction = (userData) => async (dispatch) => {
  try {
    const response = await ApiPut(`/auth/user/${userData.id}`, userData);

    dispatch({
      type: "UPDATE_USER",
      payload: response.data, 
    });
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const getUserByIdAction = (userId) => {
  return (dispatch) => {
      return ApiGet(`/admin/user/${userId}`)
    .then((res) => {
      console.log('res', res);
      if (res.data) {
        dispatch({
          type: GET_USER_BY_ID,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_USER_BY_ID,
        payload: error,
      });
    });
};
};

export const getAllCustomerAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/customer`)
    .then((res) => {
      console.log('res', res);
      if (res.customer) {
        dispatch({
          type: GET_CUSTOMERS,
          payload: res.customer,
        });
        return res.customer;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_CUSTOMERS,
        payload: error,
      });
    });
};
};
