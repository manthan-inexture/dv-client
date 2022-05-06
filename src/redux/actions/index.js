export const cusLogin = () => {
    return { type: 'CUS_LOGIN', payload: true }
}

export const cusLogout = () => {
    return { type: 'CUS_LOGOUT', payload: false }
}

export const userLogin = () => {
    return { type: 'USER_LOGIN', payload: true }
}

export const userLogout = () => {
    return { type: 'USER_LOGOUT', payload: false }
}

export const loading = () => {
    return { type: 'LOADING', payload: true }
}

export const loaded = () => {
    return { type: 'LOADING', payload: false }
}
export const userData = (user) => {
    return { type: 'USER_DATA', payload: user }
}
export const cusData = (customer) => {
    return { type: 'CUS_DATA', payload: customer }
}
export const fetchCustomerEvents = (createdEvents) => {
    return { type: 'FETCH_CREATED_EVENTS', payload: createdEvents }
}
export const addRedirectPath = () => {
    return { type: 'ADD_REDIRECT', payload: window.location.pathname };
}
export const removeRedirectPath = () => {
    return { type: 'REMOVE_REDIRECT' };
}