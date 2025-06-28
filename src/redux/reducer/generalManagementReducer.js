import { RESET_GLOBAL_STATE, DELETE_NON_PERGRAM, UPDATE_NON_PERGRAM, DELETE_NON_PERCENTAGE, DELETE_NON_UCHAK, UPDATE_NON_PERCENTAGE, UPDATE_NON_UCHAK, ADD_NON_PERGRAM, ADD_NON_PERCENTAGE, ADD_NON_UCHAK, GET_UCHAK, GET_NON_PERGRAM, GET_NON_PERCENTAGE, GET_NON_UCHAK, GET_BILL_BY_ID, ADD_UCHAK, UPDATE_UCHAK, DELETE_UCHAK, GET_COMPANY_INFO, GET_PERCENTAGE, ADD_PERCENTAGE, UPDATE_PERCENTAGE, DELETE_PERCENTAGE, ADD_COMPANY_INFO,  GET_MARKET_RATE, ADD_MARKET_RATE, GET_PERGRAM, ADD_PERGRAM, UPDATE_PERGRAM, DELETE_PERGRAM } from '../type';

const initialState = {
    getUchak: [],
    getPercentage: [],
    getMarketRate: [],
    getPergram: [],
    addUchak : [],
    updateUchak: [],
    deleteUchak: [],
    addPercentage: [],
    updatePercentage: [],
    deletePercentage: [],
    addCompanyInfo: [],
    addMarketRate: [],
    addPergram: [],
    updatePergram: [],
    deletePergram: [],
    getCompanyInfo: [],
    getBillById: null,
    getNonUchak: [],
    getNonPercentage: [],
    getNonPergram: [],
    addNonUchak : [],
    updateNonUchak: [],
    deleteNonUchak: [],
    addNonPercentage: [],
    updateNonPercentage: [],
    deleteNonPercentage: [],
    addNonPergram: [],
    updateNonPergram: [],
    deleteNonPergram: [],
};

const generalManagementReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_UCHAK: 
        return {
            ...state,
            getUchak: action.payload,
        };
        case GET_BILL_BY_ID:
            return {
                ...state,
                getBillById: action.payload,
            };
        case GET_PERCENTAGE:
            return {
                ...state,
                getPercentage: action.payload,
            };
        case GET_MARKET_RATE: 
        return {
            ...state,
            getMarketRate: action.payload,
        };
        case GET_PERGRAM: 
        return {
            ...state,
            getPergram: action.payload,
        };
        case GET_COMPANY_INFO:
            return {
                ...state,
                getCompanyInfo: action.payload,
            };
        case ADD_UCHAK: 
        return {
            ...state,
            addUchak: action.payload,
        };
        case ADD_PERCENTAGE:
            return {
                ...state,
                addPercentage: action.payload,
            };
        case ADD_COMPANY_INFO:
            return {
                ...state,
                addCompanyInfo: action.payload,
            };
        case ADD_MARKET_RATE: 
        return {
            ...state,
            addMarketRate: action.payload,
        };
        case ADD_PERGRAM: 
        return {
            ...state,
            addPergram: action.payload,
        };
        case UPDATE_UCHAK: 
        return {
            ...state,
            updateUchak: action.payload,
        };
        case UPDATE_PERCENTAGE:
            return {
                ...state,
                updatePercentage: action.payload,
            };
        case UPDATE_PERGRAM: 
        return {
            ...state,
            updatePergram: action.payload,
        };
        case DELETE_UCHAK: 
        return {
            ...state,
            deleteUchak: action.payload,
        };
        case DELETE_PERCENTAGE:
            return {
                ...state,
                deletePercentage: action.payload,
            };
        case DELETE_PERGRAM: 
        return {
            ...state,
            deletePergram: action.payload,
        };
        case GET_NON_UCHAK: 
        return {
            ...state,
            getNonUchak: action.payload,
        };
        case GET_NON_PERCENTAGE:
            return {
                ...state,
                getNonPercentage: action.payload,
            };
        case GET_NON_PERGRAM: 
        return {
            ...state,
            getNonPergram: action.payload,
        };
        case ADD_NON_UCHAK: 
        return {
            ...state,
            addNonUchak: action.payload,
        };
        case ADD_NON_PERCENTAGE:
            return {
                ...state,
                addNonPercentage: action.payload,
            };
        case ADD_NON_PERGRAM: 
        return {
            ...state,
            addNonPergram: action.payload,
        };
        case UPDATE_NON_UCHAK: 
        return {
            ...state,
            updateNonUchak: action.payload,
        };
        case UPDATE_NON_PERCENTAGE:
            return {
                ...state,
                updateNonPercentage: action.payload,
            };
        case UPDATE_NON_PERGRAM: 
        return {
            ...state,
            updateNonPergram: action.payload,
        };
        case DELETE_NON_UCHAK: 
        return {
            ...state,
            deleteNonUchak: action.payload,
        };
        case DELETE_NON_PERCENTAGE:
            return {
                ...state,
                deleteNonPercentage: action.payload,
            };
        case DELETE_NON_PERGRAM: 
        return {
            ...state,
            deleteNonPergram: action.payload,
        };
        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default generalManagementReducer;