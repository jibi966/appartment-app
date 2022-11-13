import axios from "axios";

export const HomeActionTypes = {
    GET_ALL_FLATS: "GET_ALL_FLATS",
    CLEAR_ALL_FLATS: "CLEAR_ALL_FLATS",
    GET_ONE_FLAT: "GET_ONE_FLAT",
    CLEAR_ONE_FLAT: "CLEAR_ONE_FLAT",
}


export const getAllFlatsAction = (payload: any) => {
    return {
        type: HomeActionTypes.GET_ALL_FLATS,
        payload
    }
}

export const clearAllFlatsAction = () => {
    return {
        type: HomeActionTypes.CLEAR_ALL_FLATS,
    }
}

const getOneFlatAction = (payload: any) => {
    return {
        type: HomeActionTypes.GET_ONE_FLAT,
        payload
    }
}

export const clearOneFlatAction = () => {
    return {
        type: HomeActionTypes.CLEAR_ONE_FLAT,
    }
}

export const getAllFlatsActionCall = (token: any, page?: number, limit?: number) => (dispatch: any) => {
    let config: any;
    token ? config = {headers: {"Authorization": `Bearer ${token}`}} : config = {}
    axios.get(`/flats/all-flats?page=${page}$limit=${limit}`, config).then((response: any) => {
        dispatch(getAllFlatsAction(response.data));
    }).catch((error: any) => {
        // alert("Can not get all flats");
        // manage error
    });
}
export const getOneFlatActionCall = (id: any, token: any) => (dispatch: any) => {

    const configuration = {headers: {"Authorization": `Bearer ${token}`}};
    axios.get(`/flats/get-one-flat/${id}`, configuration).then((response: any) => {
        dispatch(getOneFlatAction(response.data));
    }).catch((error: any) => {
        // manage error
    })

}


export const filterActionCall = (key: string, value: string, token: any, page?: number, limit?: number) => (dispatch: any) => {
    if (value === 'all') {
        dispatch(getAllFlatsActionCall(token, page, limit));
    } else {
        axios.get(`/flats/filter?key=${key}&value=${value}&page=${page}&limit=${limit}`, {headers: {"Authorization": `Bearer ${token}`}}).then((response: any) => {
            dispatch(getAllFlatsAction(response.data));
        }).catch((error: any) => {
            // manage error
        })
    }
}

export const sortActionCall = (key: string, value: string, token: any, page?: number, limit?: number) => (dispatch: any) => {
    if (value === 'all') {
        dispatch(getAllFlatsActionCall(token, page, limit));
    } else {
        axios.get(`/flats/sort?key=${key}&value=${value}&page=${page}&limit=${limit}`, {headers: {"Authorization": `Bearer ${token}`}}).then((response: any) => {
            dispatch(getAllFlatsAction(response.data));
        }).catch((error: any) => {
            // manage error
        })
    }
}

export const paginationActionCall = (authToken: any, page?: number, rowsPerPage?: number) => (dispatch: any) => {
    axios.get(`/flats/all-flats?page=${page}&limit=${rowsPerPage}`, {headers: {"Authorization": `Bearer ${authToken}`}}).then((response) => {
        dispatch(getAllFlatsAction(response.data));
    })
}

