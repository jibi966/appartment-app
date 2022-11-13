import {HomeActionTypes} from "./actions";


const initialState = {
    allFlats: {},
    oneFlat: {}
}

export const HomeReducer = (state = initialState, {type, payload}: any) => {
    switch (type) {

        case HomeActionTypes.GET_ALL_FLATS:

            return {...state, allFlats: payload}

        case HomeActionTypes.CLEAR_ALL_FLATS:

            return {...state, allFlats: {}}

        case HomeActionTypes.GET_ONE_FLAT:

            return {...state, oneFlat: payload}

        case HomeActionTypes.CLEAR_ONE_FLAT:

            return {...state, oneFlat: {}}

        default:

            return state;


    }
}
