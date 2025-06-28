import { RESET_GLOBAL_STATE, GET_CATEGORY, ADD_HERO_SECTION, UPDATE_HERO_SECTION, GET_HERO_SECTION, DELETE_SIZE, DELETE_DESIGN, UPDATE_SIZE, UPDATE_DESIGN, ADD_TESTIMONIAL, ADD_DESIGN, GET_TESTIMONIAL, GET_DESIGN, GET_NON_BARCODE_PRODUCT, ADD_NON_BARCODE_PRODUCT, DELETE_NON_BARCODE_PRODUCT,GET_BLOG, DELETE_CATEGORY, DELETE_NON_BARCODE_CATEGORY, UPDATE_NON_BARCODE_CATEGORY, ADD_SERVICE, GET_SERVICE, DELETE_GROUP_ITEM, UPDATE_GROUP_ITEM, ADD_BLOG, GET_PRODUCT, ADD_PRODUCT, GET_ORDER_LIST, GET_ORDER_BY_ID, GET_FAQ, ADD_CATEGORY, ADD_FAQ, UPDATE_CATEGORY, UPDATE_METAL, DELETE_PRODUCT, DELETE_METAL } from '../type';

const initialState = {
    getAllCategory: [],
    getFaq: [],
    getBlog: [],
    addCategory: [],
    addFaq: [],
    addBlog: [],
    updateCategory: [],
    updateMetal: [],
    updateGroupItem: [],
    deleteProduct: null,
    deleteMetal: [],
    deleteGroupItem: [],
    getProduct: [],
    addProduct: [],
    getOrderList: [],
    getorderById: [],
    deleteCategory: null,
    getService: [],
    addService: [],
    updateNonBarcodeCategroy: [],
    deleteNonBarcodeCategory: [],
    getNonBarcodeProduct: [],
    addNonBarcodeProduct: [],
    deleteNonBarcodeProduct: [], 
    getDesign: [],
    addDesign: [],
    updateDesign: [],
    deleteDesign: [],
    getTestimonial: [],
    addTestimonial: [],
    updateSize: [],
    deleteSize: [], 
    getHeroSection: [],
    addHeroSection: [],
    updateHeroSection: [],                                                                                  
};


const landingManagementReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CATEGORY: 
        return {
            ...state,
            getAllCategory: action.payload,
        };
        case GET_FAQ: 
        return {
            ...state,
            getFaq: action.payload,
        };
        case GET_BLOG:
            return {
                ...state,
                getBlog: action.payload,
            };
        case GET_PRODUCT: 
         return {
            ...state,
            getProduct: action.payload,
         };
         case ADD_PRODUCT:
            return {
           
                ...state,
                getProduct: [...state.getProduct, action.payload],
            };
        case ADD_CATEGORY:
            return {
                ...state,
                getAllCategory: [...state.getAllCategory, action.payload],
            };
        case ADD_FAQ:
            return {
                ...state,
                addFaq: action.payload,
            };
        case ADD_BLOG:
            return {
                ...state,
                addBlog: action.payload,
            };
        case UPDATE_CATEGORY: 
        return {
            ...state,
            getAllCategory: state.getAllCategory.map((category) =>
                category._id === action.payload.categoryId
                  ? { ...category, name: action.payload.name }
                  : category
              ),
            };
        case UPDATE_METAL: 
        return {
            ...state,
            updateMetal: action.payload,
        };
        case UPDATE_GROUP_ITEM:
            return {
                ...state,
                updateGroupItem: action.payload,
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                getProduct: state.getProduct.filter(
                    (product) => product._id !== action.payload 
                  ),
                  deleteProduct: null,
            };
        case DELETE_METAL:
            return {
                ...state,
                deleteMetal: action.payload,
            };
        case DELETE_GROUP_ITEM:
            return {
                ...state,
                deleteGroupItem: action.payload,
            };
        case GET_ORDER_LIST: 
        return {
            ...state,
            getOrderList: action.payload,
        };
        case GET_ORDER_BY_ID: 
            return {
                ...state,
                getorderById: action.payload,
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                getAllCategory: state.getAllCategory.filter(
                    (category) => category._id !== action.payload
                ),  
            };
        case GET_SERVICE:
            return {
                ...state,
                getService: action.payload,
            };
        case ADD_SERVICE: 
        return {
            ...state,
            addService: action.payload,
        };
        case UPDATE_NON_BARCODE_CATEGORY:
            return {
                ...state,
                updateNonBarcodeCategroy: action.payload,
            };
        case DELETE_NON_BARCODE_CATEGORY:
            return {
                ...state,
                deleteNonBarcodeCategory: action.payload,
            };
        case GET_NON_BARCODE_PRODUCT: 
        console.log('action.payload', action.payload)
        return {
            ...state,
            getNonBarcodeProduct: action.payload,
        };
        case ADD_NON_BARCODE_PRODUCT: 
        return {
            ...state,
            addNonBarcodeProduct: action.payload,
        };
        case DELETE_NON_BARCODE_PRODUCT:
            return {
                ...state,
                deleteNonBarcodeProduct: action.payload,
            };
        case GET_DESIGN:
            return {
                ...state,
                getDesign: action.payload,
            };
        case GET_TESTIMONIAL:
            return {
                ...state,
                getTestimonial: action.payload,
            };
        case ADD_DESIGN:
            return {
                ...state,
                addDesign: action.payload,
            };
        case ADD_TESTIMONIAL:
            return {
                ...state,
                addTestimonial: action.payload,
            };
        case UPDATE_DESIGN:
            return {
                ...state,
                updateDesign: action.payload,
            } ;
        case UPDATE_SIZE:
            return {
                ...state,
                updateSize: action.payload,
            };
        case DELETE_DESIGN:
            return {
                ...state,
                deleteDesign: action.payload,
            };
        case DELETE_SIZE: 
        return {
            ...state,
            deleteSize: action.payload,
        };
        case GET_HERO_SECTION:
            return {
                ...state,
                getHeroSection: action.payload,
            };
        case ADD_HERO_SECTION:
            return {
                ...state,
                addHeroSection: action.payload,
            };
        case UPDATE_HERO_SECTION:
            return {
                ...state,
                updateHeroSection: action.payload,
            };
        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default landingManagementReducer;