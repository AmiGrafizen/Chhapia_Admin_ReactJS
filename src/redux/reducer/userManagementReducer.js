import { RESET_GLOBAL_STATE, GET_USERS, GET_CONTACT_US, UPDATE_USER, GET_USER_BY_ID, GET_CUSTOMERS, LOGIN_ADMIN} from '../type';

const initialState = {
    getAllUsers: [],
    getContactUs: [],
    adminLogin: [],
    updateUser: [],
    getUserById: [],
    getCustomer: [],
};


const userManagementReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS: 
        return {
            ...state,
            getAllUsers: action.payload,
        };
        case GET_CONTACT_US:
            return {
                ...state,
                getContactUs: action.payload,
            };
        case LOGIN_ADMIN: 
        return {
            ...state,
            adminLogin: action.payload,
        };
        case UPDATE_USER:
            return {
                ...state,
                updateUser: action.payload,
            };
        case GET_USER_BY_ID: 
        return {
           ...state,
           getUserById: action.payload,
        };
        case GET_CUSTOMERS:
            return {
                ...state,
                getCustomer: action.payload,
            };
        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default userManagementReducer;