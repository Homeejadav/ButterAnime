import { reducerType } from '@constants';

var initialState = {

    favorite: []

}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case reducerType.favorite:
            return { ...state, favorite: action.data }



        default:
            return { ...state }
    }

}