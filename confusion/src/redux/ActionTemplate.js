import * as ActionTypes from './ActionTypes';

export const ActionTemplate = (entity) => (state = {
    isLoading: true,
    errMess: null,
    [entity]: []
}, action) => {
    const entUp = entity.toUpperCase();
    const entOne = entUp.slice(0, -1); /* chop off last character, e.g. comments -> comment */
    switch (action.type) {
        case ActionTypes.ACT[`ADD_${entUp}`]:
            return { ...state, isLoading: false, errMess: null, [entity]: action.payload };;

        case ActionTypes.ACT[`${entUp}_LOADING`]:
            return { ...state, isLoading: true, errMess: null, [entity]: [] };

        case ActionTypes.ACT[`${entUp}_FAILED`]:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.ACT[`ADD_${entOne}`]:
            var entry = action.payload;
            entry.id = state[entity].length;
            return { ...state, [entity]: state[entity].concat(entry) };

        default:
            return state;
    }
};