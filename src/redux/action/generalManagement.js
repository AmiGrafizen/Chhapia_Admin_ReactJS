import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostData,
    ApiPostNoAuth,
    ApiPut,
    ApiPutWithId,
} from '../../helper/axios';
import { GET_UCHAK, ADD_UCHAK,UPDATE_NON_UCHAK,UPDATE_NON_PERCENTAGE, DELETE_NON_PERGRAM, UPDATE_NON_PERGRAM, ADD_NON_PERGRAM, GET_NON_PERGRAM, DELETE_NON_PERCENTAGE, ADD_NON_PERCENTAGE, GET_NON_PERCENTAGE, DELETE_NON_UCHAK, UPDATE_UCHAK, ADD_NON_UCHAK, GET_NON_UCHAK, DELETE_UCHAK, GET_BILL_BY_ID, GET_COMPANY_INFO, ADD_COMPANY_INFO, UPDATE_BRAND, DELETE_BRAND, GET_PERCENTAGE, ADD_PERCENTAGE, UPDATE_PERCENTAGE, DELETE_PERCENTAGE, GET_PERGRAM,ADD_PERGRAM,UPDATE_PERGRAM,DELETE_PERGRAM, GET_MARKET_RATE, ADD_MARKET_RATE, UPDATE_ATTRIBUTE, DELETE_ATTRIBUTE} from '../type';

export const getInvoiceByIdAction = (invoiceId) => {
  return (dispatch) => {
      return ApiGet(`/admin/bill/${invoiceId}`)
    .then((res) => {
      console.log('res', res);
      if (res.bill) {
        dispatch({
          type: GET_BILL_BY_ID,
          payload: res.bill,
        });
        return res.bill;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_BILL_BY_ID,
        payload: error,
      });
    });
};
};

export const getAllUchakAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/uchak`)
      .then((res) => {
        console.log('res', res);
        if (res.uchak) {
          dispatch({
            type: GET_UCHAK,
            payload: res.uchak,
          });
          return res.uchak;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_UCHAK,
          payload: error,
        });
      });
  };
};

export const addUchakAction = (formData) => {
  return (dispatch) => {
      return ApiPost(`/admin/uchak`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.data.uchak) {
        dispatch({
          type: ADD_UCHAK,
          payload: res.data.uchak,
        });
        return res.data.uchak;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_UCHAK,
        payload: error,
      });
    });
};
};

export const updateUchakAction = (id, formData) => {
  return (dispatch) => {
      return ApiPut(`/admin/uchak/${id}`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.uchak) {
        dispatch({
          type: UPDATE_UCHAK,
          payload: res.uchak,
        });
        return res.uchak;
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_UCHAK,
        payload: error,
      });
    });
};
};

export const deleteUchakAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/admin/uchak/${id}`)
    .then((res) => {
      console.log('res', res);
      if (res.uchak) {
        dispatch({
          type: DELETE_UCHAK,
          payload: res.uchak,
        });
        return res.uchak;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_UCHAK,
        payload: error,
      });
    });
};
};

export const getAllNonUchakAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/non-uchak`)
      .then((res) => {
        console.log('res', res);
        if (res.uchak) {
          dispatch({
            type: GET_NON_UCHAK,
            payload: res.uchak,
          });
          return res.uchak;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_NON_UCHAK,
          payload: error,
        });
      });
  };
};

export const addNonUchakAction = (formData) => {
  return (dispatch) => {
      return ApiPost(`/admin/non-uchak`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.data.uchak) {
        dispatch({
          type: ADD_NON_UCHAK,
          payload: res.data.uchak,
        });
        return res.data.uchak;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_NON_UCHAK,
        payload: error,
      });
    });
};
};

export const updateNonUchakAction = (id, formData) => {
  return (dispatch) => {
      return ApiPut(`/admin/non-uchak/${id}`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.uchak) {
        dispatch({
          type: UPDATE_NON_UCHAK,
          payload: res.uchak,
        });
        return res.uchak;
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_NON_UCHAK,
        payload: error,
      });
    });
};
};

export const deleteNonUchakAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/admin/non-uchak/${id}`)
    .then((res) => {
      console.log('res', res);
      if (res.uchak) {
        dispatch({
          type: DELETE_NON_UCHAK,
          payload: res.uchak,
        });
        return res.uchak;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_NON_UCHAK,
        payload: error,
      });
    });
};
};


export const getCompanyInfoAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/info`)
      .then((res) => {
        console.log('res', res);
        if (res.data) {
          dispatch({
            type: GET_COMPANY_INFO,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_COMPANY_INFO,
          payload: error,
        });
      });
  };
};

export const addCompanyInfoAction = (formData) => {
  return (dispatch) => {
      return ApiPost(`/admin/info`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.data.data) {
        dispatch({
          type: ADD_COMPANY_INFO,
          payload: res.data.data,
        });
        return res.data.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_COMPANY_INFO,
        payload: error,
      }); 
    });
};
};


export const getPercentageAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/percentage`)
      .then((res) => {
        console.log('res', res);
        if (res.percentage) {
          dispatch({
            type: GET_PERCENTAGE,
            payload: res.percentage,
          });
          return res.percentage;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_PERCENTAGE,
          payload: error,
        });
      });
  };
};

export const addPercentageAction = (formData) => {
  return (dispatch) => {
      return ApiPost(`/admin/percentage`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.data.percentage) {
        dispatch({
          type: ADD_PERCENTAGE,
          payload: res.data.percentage,
        });
        return res.data.percentage;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_PERCENTAGE,
        payload: error,
      });
    });
};
};

export const updatePercentageAction = (id, formData) => {
  return (dispatch) => {
      return ApiPut(`/admin/percentage/${id}`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.percentage) {
        dispatch({
          type: UPDATE_PERCENTAGE,
          payload: res.percentage,
        });
        return res.percentage;
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_PERCENTAGE,
        payload: error,
      });
    });
};
};

export const deletePercentageAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/admin/percentage/${id}`)
    .then((res) => {
      console.log('res', res);
      if (res.percentage) {
        dispatch({
          type: DELETE_PERCENTAGE,
          payload: res.percentage,
        });
        return res.percentage;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_PERCENTAGE,
        payload: error,
      });
    });
};
};

export const getNonPercentageAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/non-percentage`)
      .then((res) => {
        console.log('resfgh', res);
        if (res.percentage) {
          dispatch({
            type: GET_NON_PERCENTAGE,
            payload: res.percentage,
          });
          return res.percentage;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_NON_PERCENTAGE,
          payload: error,
        });
      });
  };
};


export const addNonPercentageAction = (formData) => {
  return (dispatch) => {
      return ApiPost(`/admin/non-percentage`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.data.percentage) {
        dispatch({
          type: ADD_NON_PERCENTAGE,
          payload: res.data.percentage,
        });
        return res.data.percentage;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_NON_PERCENTAGE,
        payload: error,
      });
    });
};
};

export const updateNonPercentageAction = (id, formData) => {
  return (dispatch) => {
      return ApiPut(`/admin/non-percentage/${id}`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.percentage) {
        dispatch({
          type: UPDATE_NON_PERCENTAGE,
          payload: res.percentage,
        });
        return res.percentage;
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_NON_PERCENTAGE,
        payload: error,
      });
    });
};
};

export const deleteNonPercentageAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/admin/non-percentage/${id}`)
    .then((res) => {
      console.log('res', res);
      if (res.percentage) {
        dispatch({
          type: DELETE_NON_PERCENTAGE,
          payload: res.percentage,
        });
        return res.percentage;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_NON_PERCENTAGE,
        payload: error,
      });
    });
};
};

export const getPerGramAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/pergram`)
      .then((res) => {
        console.log('res', res);
        if (res.pergram) {
          dispatch({
            type: GET_PERGRAM,
            payload: res.pergram,
          });
          return res.pergram;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_PERGRAM,
          payload: error,
        });
      });
  };
};

export const addPerGramAction = (formData) => {
  return (dispatch) => {
      return ApiPost(`/admin/pergram`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.data.pergram) {
        dispatch({
          type: ADD_PERGRAM,
          payload: res.data.pergram,
        });
        return res.data.pergram;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_PERGRAM,
        payload: error,
      });
    });
};
};

export const updatePerGramAction = (id, formData) => {
  return (dispatch) => {
      return ApiPut(`/admin/pergram/${id}`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.pergram) {
        dispatch({
          type: UPDATE_PERGRAM,
          payload: res.pergram,
        });
        return res.pergram;
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_PERGRAM,
        payload: error,
      });
    });
};
};

export const deletePerGramAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/admin/pergram/${id}`)
    .then((res) => {
      console.log('res', res);
      if (res.pergram) {
        dispatch({
          type: DELETE_PERGRAM,
          payload: res.pergram,
        });
        return res.pergram;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_PERGRAM,
        payload: error,
      });
    });
};
};

export const getNonPerGramAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/non-pergram`)
    .then((res) => {
      console.log('res', res);
      if (res.pergram) {
        dispatch({
          type: GET_NON_PERGRAM,
          payload: res.pergram,
        });
        return res.pergram;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_NON_PERGRAM,
        payload: error,
      });
    });
};
};

export const addNonPerGramAction = (formData) => {
return (dispatch) => {
    return ApiPost(`/admin/non-pergram`, formData)
  .then((res) => {
    console.log('res', res);
    if (res.data.pergram) {
      dispatch({
        type: ADD_NON_PERGRAM,
        payload: res.data.pergram,
      });
      return res.data.pergram;
    }
  })
  .catch((error) => {
    dispatch({
      type: ADD_NON_PERGRAM,
      payload: error,
    });
  });
};
};

export const updateNonPerGramAction = (id, formData) => {
return (dispatch) => {
    return ApiPut(`/admin/non-pergram/${id}`, formData)
  .then((res) => {
    console.log('res', res);
    if (res.pergram) {
      dispatch({
        type: UPDATE_NON_PERGRAM,
        payload: res.pergram,
      });
      return res.pergram;
    }
  })
  .catch((error) => {
    dispatch({
      type: UPDATE_NON_PERGRAM,
      payload: error,
    });
  });
};
};

export const deleteNonPerGramAction = (id) => {
return (dispatch) => {
    return ApiDelete(`/admin/non-pergram/${id}`)
  .then((res) => {
    console.log('res', res);
    if (res.pergram) {
      dispatch({
        type: DELETE_NON_PERGRAM,
        payload: res.pergram,
      });
      return res.pergram;
    }
  })
  .catch((error) => {
    dispatch({
      type: DELETE_NON_PERGRAM,
      payload: error,
    });
  });
};
};


export const getMarketRateAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/market-rate`)
      .then((res) => {
        console.log('ressadfgh', res);
        if (res.marketRate) {
          dispatch({
            type: GET_MARKET_RATE,
            payload: res.marketRate,
          });
          return res.marketRate;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_MARKET_RATE,
          payload: error,
        });
      });
  };
};

export const addMarketRateAction = (rates) => {
  return (dispatch) => {
      return ApiPost(`/admin/market-rate`, { rates } )
    .then((res) => {
      console.log('res', res);
      if (res.data.marketRate) {
        dispatch({
          type: ADD_MARKET_RATE,
          payload: res.data.marketRate,
        });
        return res.data.marketRate;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_MARKET_RATE,
        payload: error,
      });
    });
};
};


