import {
  ApiDelete,
  ApiGet,
  ApiPost,
  ApiPut,
} from '../../helper/axios';
import { GET_CATEGORY, GET_BLOG, GET_FAQ, UPDATE_HERO_SECTION, ADD_HERO_SECTION, ADD_DESIGN,UPDATE_DESIGN, DELETE_SIZE, DELETE_DESIGN, GET_TESTIMONIAL, ADD_TESTIMONIAL, UPDATE_SIZE, ADD_NON_BARCODE_PRODUCT, GET_DESIGN,  DELETE_NON_BARCODE_PRODUCT, GET_NON_BARCODE_PRODUCT, UPDATE_NON_BARCODE_CATEGORY, GET_HERO_SECTION, DELETE_NON_BARCODE_CATEGORY, ADD_SERVICE, GET_SERVICE, GET_ORDER_BY_ID, DELETE_CATEGORY, GET_PRODUCT, ADD_PRODUCT, DELETE_GROUP_ITEM, ADD_CATEGORY, ADD_FAQ, ADD_BLOG, UPDATE_METAL, UPDATE_GROUP_ITEM,  UPDATE_CATEGORY, DELETE_PRODUCT, DELETE_METAL} from '../type';


export const getCategroyAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/categories`)
    .then((res) => {
      console.log('res', res);
      if (res.category) {
        dispatch({
          type: GET_CATEGORY,
          payload: res.category,
        });
        return res.category;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_CATEGORY,
        payload: error,
      });
    });
};
};

export const getTeamAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/service`)
    .then((res) => {
      console.log('resasdf', res);
      if (res.data) {
        dispatch({
          type: GET_SERVICE,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_SERVICE,
        payload: error,
      });
    });
};
};

export const getHeroAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/hero-section`)
    .then((res) => {
      console.log('resasdf', res);
      if (res.data) {
        dispatch({
          type: GET_HERO_SECTION,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_HERO_SECTION,
        payload: error,
      });
    });
};
};



export const getTestimonialAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/what-we-do`)
    .then((res) => {
      console.log('res', res);
      if (res.data) {
        dispatch({
          type: GET_TESTIMONIAL,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_TESTIMONIAL,
        payload: error,
      });
    });
  };
  };

export const getOrderByIdAction = (orderId) => {
return (dispatch) => {
    return ApiGet(`/admin/order/${orderId}`)
  .then((res) => {
    console.log('res', res)
    if (res.order) {
      dispatch({
        type: GET_ORDER_BY_ID,
        payload: res.order,
      });
      return res.order;
    }
  })
  .catch((error) => {
    dispatch({
      type: GET_ORDER_BY_ID,
      payload: error,
    });
  });
};
};

export const getFaqAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/calculation`)
    .then((res) => {
      console.log('ressdfgh', res);
      if (res.data) {
        dispatch({
          type: GET_FAQ,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_FAQ,
        payload: error,
      });
    });
};
};

export const getBlogAction = () => {
return (dispatch) => {
    return ApiGet(`/admin/why-choose-us`)
  .then((res) => {
    console.log('resblog', res);
    if (res.data) {
      dispatch({
        type: GET_BLOG,
        payload: res.data,
      });
      return res.data;
    }
  })
  .catch((error) => {
    dispatch({
      type: GET_BLOG,
      payload: error,
    });
  });
};
};

export const getAllStockAction = (id) => {
return (dispatch) => {
    return ApiGet(`/admin/product/${id}`)
  .then((res) => {
    console.log('res', res);
    if (res.product) {
      dispatch({
        type: GET_PRODUCT,
        payload: res.product,
      });
      return res.product;
    }
  })
  .catch((error) => {
    dispatch({
      type: GET_PRODUCT,
      payload: error,
    });
  });
};
};

export const getDesignAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/design`)
    .then((res) => {
      console.log('res', res);
      if (res.design) {
        dispatch({
          type: GET_DESIGN,
          payload: res.design,
        });
        return res.design;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_PRODUCT,
        payload: error,
      });
    });
  };
  };

export const getAllNonBarcodeProductAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/products`)
    .then((res) => {
      console.log('res', res);
      if (res.product) {
        dispatch({
          type: GET_NON_BARCODE_PRODUCT,
          payload: res.product,
        });
        return res.product;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_NON_BARCODE_PRODUCT,
        payload: error,
      });
    });
  };
  };


export const addStockAction = (stockData) => {
return (dispatch) => {
    return ApiPost(`/admin/product`, stockData)
  .then((res) => {
    console.log('resasdfg', res);
    if (res.data.data) {
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data.data,
      });
      return res.data.data;
    }
  })
  .catch((error) => {
    dispatch({
      type: ADD_PRODUCT,
      payload: error,
    });
  });
};
};

export const addDesignAction = (designData) => {
  return (dispatch) => {
      return ApiPost(`/admin/design`, designData)
    .then((res) => {
      console.log('resasdfg', res);
      if (res.data.design) {
        dispatch({
          type: ADD_DESIGN,
          payload: res.data.design,
        });
        return res.data.design;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_DESIGN,
        payload: error,
      });
    });
  };
  };

  export const addTestimonialAction = (stockData) => {
    return (dispatch) => {
        return ApiPost(`/admin/what-we-do`, stockData)
      .then((res) => {
        console.log('resasdfg', res);
        if (res.data.whatWeDo) {
          dispatch({
            type: ADD_TESTIMONIAL,
            payload: res.data.whatWeDo,
          });
          return res.data.whatWeDo;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_TESTIMONIAL,
          payload: error,
        });
      }); 
    };
    };

export const addNonBarcodeProductAction = (stockData) => {
  return (dispatch) => {
      return ApiPost(`/admin/product`, stockData)
    .then((res) => {
      console.log('resasdfg', res);
      if (res.data.data) {
        dispatch({
          type: ADD_NON_BARCODE_PRODUCT,
          payload: res.data.data,
        });
        return res.data.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_NON_BARCODE_PRODUCT,
        payload: error,
      });
    });
  };
  };

export const addFaqAction = (formData) => {
  return (dispatch) => {
      return ApiPost(`/admin/calculation`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.faq) {
        dispatch({
          type: ADD_FAQ,
          payload: res.faq,
        });
        return res.faq;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_FAQ,
        payload: error,
      });
    });
};
};

export const addBlogAction = (formData) => {
return (dispatch) => {
    return ApiPost(`/admin/why-us`, formData)
  .then((res) => {
    console.log('res', res);
    if (res.blog) {
      dispatch({
        type: ADD_BLOG,
        payload: res.blog,
      });
      return res.blog;
    }
  })
  .catch((error) => {
    dispatch({
      type: ADD_BLOG,
      payload: error,
    });
  });
};
};

export const addCategoryAction = (data) => {
console.log("api called")
  return (dispatch) => {
      return ApiPost(`/admin/category`, data)
    .then((res) => {
      console.log('ressss', res);
      if (res.data.category) {
        dispatch({
          type: ADD_CATEGORY,
          payload: res.data.category,
        });
        return res.data.category;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_CATEGORY,
        payload: error,
      });
    });
};
};

export const addTeamAction = (formData) => {
  console.log("api called")
    return (dispatch) => {
        return ApiPost(`/admin/service`, formData)
      .then((res) => {
        console.log('ressss', res);
        if (res.data.service) {
          dispatch({
            type: ADD_SERVICE,
            payload: res.data.service,
          });
          return res.data.service;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_SERVICE,
          payload: error,
        });
      });
  };
  };

  export const addHeroAction = (formData) => {
  console.log("api called")
    return (dispatch) => {
        return ApiPost(`/admin/hero-section`, formData)
      .then((res) => {
        console.log('ressss', res);
        if (res.data.service) {
          dispatch({
            type: ADD_HERO_SECTION,
            payload: res.data.service,
          });
          return res.data.service;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_HERO_SECTION,
          payload: error,
        });
      });
  };
  };


export const updateTeamAction = (teamId, formData) => {
  return (dispatch) => {
      return ApiPut(`/admin/service/${teamId}`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.data) {
        dispatch({
          type: UPDATE_METAL,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_METAL,
        payload: error,
      });
    });
};
};

export const updateHeroAction = (teamId, formData) => {
  return (dispatch) => {
      return ApiPut(`/admin/hero-section/${teamId}`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.data) {
        dispatch({
          type: UPDATE_HERO_SECTION,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_HERO_SECTION,
        payload: error,
      });
    });
};
};

export const updateFAQAction = (id, formData) => {
  return (dispatch) => {
      return ApiPut(`/admin/calculation/${id}`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.data) {
        dispatch({
          type: UPDATE_DESIGN,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_DESIGN,
        payload: error,
      });
    });
};
};

export const updateTestimonialAction = (id, formData) => {
  return (dispatch) => {
      return ApiPut(`/admin/what-we-do/${id}`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.data) {
        dispatch({
          type: UPDATE_SIZE,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_SIZE,
        payload: error,
      });
    });
};
};

export const updateBlogAction = (id, formData) => {
return (dispatch) => {
    return ApiPut(`/admin/why-us/${id}`, formData)
  .then((res) => {
    console.log('res', res);
    if (res.data) {
      dispatch({
        type: UPDATE_GROUP_ITEM,
        payload: res.data,
      });
      return res.data;
    }
  })
  .catch((error) => {
    dispatch({
      type: UPDATE_GROUP_ITEM,
      payload: error,
    });
  });
};
};

export const updateCategoryAction = (categoryId, formData) => {
  return (dispatch) => {
      return ApiPut(`/admin/category/${categoryId}`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.category) {
        dispatch({
          type: UPDATE_CATEGORY,
          payload: res.category,
        });
        return res.category;
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_CATEGORY,
        payload: error,
      });
    });
};
};

export const updateNonBarcodeCategoryAction = (nonBarcodeCategoryId, formData) => {
  return (dispatch) => {
      return ApiPut(`/admin/non-barcode-category/${nonBarcodeCategoryId}`, formData)
    .then((res) => {
      console.log('res', res);
      if (res.category) {
        dispatch({
          type: UPDATE_NON_BARCODE_CATEGORY,
          payload: res.category,
        });
        return res.category;
      }
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_NON_BARCODE_CATEGORY,
        payload: error,
      });
    });
};
};

export const updateStockAction = (productId, formData) => async () => {
try {
  const response = await ApiPut(`/admin/product/${productId}`, formData); 
  console.log("Product updated successfully:", response);
  return response;
} catch (error) {
  console.error("Error updating product:", error);
  throw error;
}
};

export const updateNonBarcodeProductAction = (productId, formData) => async () => {
  try {
    const response = await ApiPut(`/admin/product/${productId}`, formData); 
    console.log("Product updated successfully:", response);
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
  };


export const deleteStockAction = (productId) => {
  return (dispatch) => {
      return ApiDelete(`/admin/product/${productId}`)
    .then((res) => {
      console.log('res', res);
      if (res.product) {
        dispatch({
          type: DELETE_PRODUCT,
          payload: productId,
        });
        return res.product;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: error,
      });
    });
};
};

export const deleteNonBarcodeProductAction = (productId) => {
  return (dispatch) => {
      return ApiDelete(`/admin/product/${productId}`)
    .then((res) => {
      console.log('res', res);
      if (res.product) {
        dispatch({
          type: DELETE_NON_BARCODE_PRODUCT,
          payload: productId,
        });
        return res.product;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_NON_BARCODE_PRODUCT,
        payload: error,
      });
    });
};
};

export const deleteMetalAction = (metalId) => {
  return (dispatch) => {
      return ApiDelete(`/admin/metal/${metalId}`)
    .then((res) => {
      console.log('res', res);
      if (res.category) {
        dispatch({
          type: DELETE_METAL,
          payload: res.category,
        });
        return res.category;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_METAL,
        payload: error,
      });
    });
};
};

export const deleteDesignAction = (designId) => {
  return (dispatch) => {
      return ApiDelete(`/admin/design/${designId}`)
    .then((res) => {
      console.log('res', res);
      if (res.design) {
        dispatch({
          type: DELETE_DESIGN,
          payload: res.design,
        });
        return res.design;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_DESIGN,
        payload: error,
      });
    });
};
};

export const deleteSizeAction = (sizeId) => {
  return (dispatch) => {
      return ApiDelete(`/admin/size/${sizeId}`)
    .then((res) => {
      console.log('res', res);
      if (res.size) {
        dispatch({
          type: DELETE_SIZE,
          payload: res.size,
        });
        return res.size;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_SIZE,
        payload: error,
      });
    });
};
};



export const deleteGroupItemAction = (categoryId) => {
return (dispatch) => {
    return ApiDelete(`/admin/group-item/${categoryId}`)
  .then((res) => {
    console.log('res', res);
    if (res.category) {
      dispatch({
        type: DELETE_GROUP_ITEM,
        payload: res.category,
      });
      return res.category;
    }
  })
  .catch((error) => {
    dispatch({
      type: DELETE_GROUP_ITEM,
      payload: error,
    });
  });
};
};
export const deleteCategoryAction = (id) => async (dispatch) => {
  try {
    await ApiDelete(`/admin/category/${id}`); 
    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error; 
  }
};

export const deleteNonBarcodeProdcutAction = (nonBarcodeCategoryId) => {
  return (dispatch) => {
      return ApiDelete(`/admin/product/${nonBarcodeCategoryId}`)
    .then((res) => {
      console.log('Api delete category', res);
      if (res.category) {
        dispatch({
          type: DELETE_NON_BARCODE_CATEGORY,
          payload: res.category,
        });
        return res.category;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_NON_BARCODE_CATEGORY,
        payload: error,
      });
    });
  };
  };


