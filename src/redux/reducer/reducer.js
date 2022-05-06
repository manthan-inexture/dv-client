var initialState = {
    loading: true,
    cusLoginStatus: false,
    userLoginStatus: false,
    userData: null,
    cusData: null,
    createdEvents: null,
    registeredEvents: null,
    redirect: null
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CUS_LOGIN": return { ...state, cusLoginStatus: action.payload };
        case "CUS_LOGOUT": return { ...state, cusLoginStatus: action.payload };
        case "USER_LOGIN": return { ...state, userLoginStatus: action.payload };
        case "USER_LOGOUT": return { ...state, userLoginStatus: action.payload };
        case "LOADING": return { ...state, loading: action.payload };
        case 'CUS_DATA': return { ...state, cusData: action.payload };
        case 'USER_DATA': return { ...state, userData: action.payload };
        case 'FETCH_CREATED_EVENTS': return { ...state, createdEvents: action.payload };
        case 'ADD_REDIRECT': return { ...state, redirect: action.payload };
        case 'REMOVE_REDIRECT': return { ...state, redirect: null };
        default: return state;
    }
}
export default reducer;