/*
 * Templated code for creating action types for different entities for better resuse.
 * Just add entity name (e.g.COMMENTS) in "entities".Function "genTypes"
 * uses it to generate types for each entity and exports them in "ACT" object.
 * 
 * For example for "DISHES", it will generate type for following actions:
 *      ADD_DISHES, DISHES_LOADING, DISHES_FAILED, ADD_DISH
 * 
 * They can be accessed by exported "ACT" object as: ACT.ADD_DISHES
 */

const entities = ['DISHES', 'COMMENTS', 'PROMOTIONS', 'LEADERS', 'FEEDBACKS'];
export const ACT = {};

/*
 * Generate different action types: ADD, LOADING, FAILED, etc for each given entity
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
console.log(ACT);
