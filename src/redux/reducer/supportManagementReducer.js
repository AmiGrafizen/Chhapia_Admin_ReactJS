import { RESET_GLOBAL_STATE, GET_WARRANTIES, GET_COMPLAINTS, DELETE_COMPLAINT, GET_ISSUES, GET_QUICK_FIX, DELETE_ISSUE, EDIT_ISSUE, ADD_ISSUE, EDIT_QUICKFIX, DELETE_QUICKFIX, ADD_QUICKFIX,} from '../type';

const initialState = {
    getWarranties: [],
    getComplaints: [],
    deleteComplaint: [],
    getIsuues: [],
    getQuickFix: [],
    addIssue: [],
    updateIssue: [],
    deleteIssue: [],
    addQuickFIx: [],
    updateQuickFix: [],
    deleteQuickFix: [],
};


const supportManagementReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_WARRANTIES: 
        return {
            ...state,
            getWarranties: action.payload,
        };
        case GET_COMPLAINTS:
            return {
                ...state,
                getComplaints: action.payload,
            };
        case DELETE_COMPLAINT: 
        return {
            ...state,
            deleteComplaint: action.payload,
        };
        case GET_QUICK_FIX:
            return {
                ...state,
                getQuickFix: action.payload,
            };
        case GET_ISSUES:
            return {
                ...state,
                getIsuues: action.payload,
            };
        case ADD_ISSUE:
        return {
        ...state,
        addIssue: action.payload,
        };
        case EDIT_ISSUE: 
            return {
            ...state,
            updateIssue: action.payload,
            };
        case DELETE_ISSUE: 
        return {
        ...state,
        deleteIssue: action.payload,
        };
        case ADD_QUICKFIX: 
        return {
            ...state,
            addQuickFix: action.payload,
        };
        case DELETE_QUICKFIX: 
        return {
            ...state,
            deleteQuickFix: action.payloaf,
        };
        case EDIT_QUICKFIX:
            return {
                ...state,
                updateQuickFix: action.payload,
            };
        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default supportManagementReducer;