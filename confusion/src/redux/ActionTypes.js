const entities = ['DISHES', 'COMMENTS', 'PROMOTIONS', 'LEADERS'];
export const ACT = {};

/*
 * Generate different action types: ADD, LOADING, FAILED for each given entity
 * e.g. ADD_DISHES, DISHES_LOADING, DISHES_FAILED
 */
function genTypes() {
    for (let i = 0; i < entities.length; i++) {
        const entOne = entities[i].slice(0, -1); /* chop off last character, e.g. comments -> comment */
        ACT[`ADD_${entities[i]}`] = `ADD_${entities[i]}`;
        ACT[`${entities[i]}_LOADING`] = `${entities[i]}_LOADING`;
        ACT[`${entities[i]}_FAILED`] = `${entities[i]}_FAILED`;
        ACT[`ADD_${entOne}`] = `ADD_${entOne}`;
    }
}

genTypes();
/*
export const ADD_COMMENT = 'ADD_COMMENT';
*/
