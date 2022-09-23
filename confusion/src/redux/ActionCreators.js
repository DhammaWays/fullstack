import * as ActionTypes from './ActionTypes';
/* import { DISHES } from '../shared/dishes'; */


import * as DATA1 from '../shared/dishes';
import * as DATA2 from '../shared/promotions';
import * as DATA3 from '../shared/comments';

const DATA = { ...DATA1, ...DATA2, ...DATA3 };

/*
export const addComment = (dishId, rating, author, comment) => ({
	type: ActionTypes.ADD_COMMENT,
	payload: {
		dishId: dishId,
		rating: rating,
		author: author,
		comment: comment
	}
});
*/

/*
export const fetchDishes = () => (dispatch) => {
	dispatch(dishesLoading(true));

	setTimeout(() => {
		dispatch(addDishes(DISHES));
	}, 2000);
}

export const dishesLoading = () => ({
	type: ActionTypes.ACT.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
	type: ActionTypes.ACT.DISHES_FAILED,
	payload: errmess
});

export const addDishes = (dishes) => ({
	type: ActionTypes.ACT.ADD_DISHES,
	payload: dishes
});
*/

/* const entities = ['DISHES', 'COMMENTS', 'PROMOTIONS', 'LEADERS']; */
const entities = ['DISHES', 'PROMOTIONS', 'COMMENTS'];
export const FETCH = {};

/*
 * Generate different action types: ADD, LOADING, FAILED for each given entity
 * e.g. ADD_DISHES, DISHES_LOADING, DISHES_FAILED, ADD_DISHE
 */
function creActions() {
	for (let i = 0; i < entities.length; i++) {
		const ent_uc = entities[i];
		const ent_lc = ent_uc.toLowerCase();
		const ent_tc = ent_lc.charAt(0).toUpperCase() + ent_lc.substring(1);
		const ent_one = ent_tc.slice(0, -1); /* chop off last character, e.g. comments -> comment */


		const entFetch = `fetch${ent_tc}`;
		const entAdd = `add${ent_tc}`;
		const entLoading = `${ent_lc}Loading`;
		const entFailed = `${ent_lc}Failed`;
		const entAddOne = `add${ent_one}`;


		FETCH[entLoading] = () => ({
			type: ActionTypes.ACT[`${ent_uc}_LOADING`]
		});

		FETCH[entFailed] = (errmess) => ({
			type: ActionTypes.ACT[`${ent_uc}_FAILED`],
			payload: errmess
		});

		FETCH[entAdd] = (data) => ({
			type: ActionTypes.ACT[`ADD_${ent_uc}`],
			payload: data
		});

		FETCH[entFetch] = () => (dispatch) => {
			dispatch(FETCH[entLoading](true));

			setTimeout(() => {
				dispatch(FETCH[entAdd](DATA[ent_uc]));
			}, 2000);
		}

		FETCH[entAddOne] = (data) => ({
			type: ActionTypes.ACT[`ADD_${ent_uc}`],
			payload: {...data}
		});
	}
}

console.log(FETCH);

creActions();