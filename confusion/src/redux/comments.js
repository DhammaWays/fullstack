/*
 * Using templated the code for different action types for better reuse.
 * ActionTemplate(entity) defined in ActionTemplate.js" will generate all relevant actions.
 * 
 * Just listing "ActionTemplate.js"  here for reference purpose to allow grader to check.
 */

/*
export const ActionTemplate = (entity) => (state = {
    isLoading: true,
    errMess: null,
    [entity]: []
    }, action) => {
    const entUp = entity.toUpperCase();
    const entOne = entUp.slice(0, -1);
    switch (action.type) {
    case ActionTypes.ACT[`ADD_${entUp}`]:
        return { ...state, isLoading: false, errMess: null, [entity]: action.payload };;

    case ActionTypes.ACT[`${entUp}_LOADING`]:
        return { ...state, isLoading: true, errMess: null, [entity]: [] };

    case ActionTypes.ACT[`${entUp}_FAILED`]:
        return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.ACT[`ADD_${entOne}`]:
        return { ...state, [entity]: state[entity].concat(action.payload) };

    default:
        return state;
    }
};
 */

import { ActionTemplate } from './ActionTemplate';
export const Comments = ActionTemplate('comments');
