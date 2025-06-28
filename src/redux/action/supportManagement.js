import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPut,
} from '../../helper/axios';
import { GET_WARRANTIES, GET_COMPLAINTS, GET_QUICK_FIX, GET_ISSUES  } from '../type';


export const getAllWarrantyAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/warranties`)
      .then((res) => {
        if (res.warranties) {
          dispatch({
            type: GET_WARRANTIES,
            payload: res.warranties,
          });
          return res.warranties;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_WARRANTIES,
          payload: error,
        });
      });
  };
};

export const getAllComplaintAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/complaints`)
    .then((res) => {
      if (res.complaints) {
        dispatch({
          type: GET_COMPLAINTS,
          payload: res.complaints,
        });
        return res.complaints;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_COMPLAINTS,
        payload: error,
      });
    });
};
};

export const getAllIssueAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/problem`)
      .then((res) => {
        if (res.data) {
          dispatch({
            type: GET_ISSUES,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_ISSUES,
          payload: error,
        });
      });
  };
  };

export const getAllQuickFixAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/quick-fix`)
      .then((res) => {
        if (res.data) {
          dispatch({
            type: GET_QUICK_FIX,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_QUICK_FIX,
          payload: error,
        });
      });
  };
  };

export const deleteComplaintAction = (complaintId) => async (dispatch) => {
    try {
      await ApiDelete(`/admin/complaint/${complaintId}`);
      dispatch({ type: "DELETE_COMPLAINT", payload: complaintId });
    } catch (error) {
      console.error("Delete complaint failed:", error);
      throw error;
    }
  };

  export const addIssueAction = (problem) => async (dispatch) => {
    const response = await ApiPost("/admin/problem", { problem });
    dispatch({ type: "ADD_ISSUE", payload: response.data });
    return response.data;
  };

  export const editIssueAction = (id, problem) => async (dispatch) => {
    const response = await ApiPut(`/admin/problem/${id}`, { problem });
    dispatch({ type: "EDIT_ISSUE", payload: response.data });
    return response.data;
  };
  
  export const deleteIssueAction = (id) => async (dispatch) => {
    await ApiDelete(`/admin/problem/${id}`);
    dispatch({ type: "DELETE_ISSUE", payload: id });
  };
  

  export const addQuickFix = (newQuickFix) => async (dispatch) => {
    try {
      const response = await ApiPost("/admin/quick-fix", newQuickFix);
      dispatch({ type: "ADD_QUICKFIX", payload: response.data });
    } catch (error) {
      console.error("Error adding QuickFix:", error.message);
    }
  };
  
  export const editQuickFix = (id, updatedQuickFix) => async (dispatch) => {
    try {
      const response = await ApiPut(`/admin/quick-fix/${id}`, updatedQuickFix);
      dispatch({ type: "EDIT_QUICKFIX", payload: response.data });
    } catch (error) {
      console.error("Error editing QuickFix:", error.message);
    }
  };
  export const deleteQuickFix = (id) => async (dispatch) => {
    try {
      await ApiDelete(`/admin/quick-fix/${id}`);
      dispatch({ type: "DELETE_QUICKFIX", payload: id });
    } catch (error) {
      console.error("Error deleting QuickFix:", error.message);
    }
  };