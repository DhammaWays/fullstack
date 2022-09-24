/*
 * Templated code for action creators for different entities for better resuse.
 * Just add entity name (e.g. COMMENTS) in "entities". Function "creActions"
 * uses it to generate code for each action and exports them in "FETCH" object.
 * 
 * For example for "COMMENTS", it will generate functions for:
 *		addComments, commentsLoading, commentsFailed, addComment, postComment
 * 
 *  They can be accessed by exported "FETCH" object: FETCH.addComments(data)
 */

import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

/*
 * Use this when just fetching from local files
 * 
 * import * as DATA1 from '../shared/dishes';
 * import * as DATA2 from '../shared/promotions';
 * import * as DATA3 from '../shared/comments';
 *
 * Merging above imports into one, sothat we can dynamically access it from one place.
 * const DATA = { ...DATA1, ...DATA2, ...DATA3 };
 */


const entities = ['DISHES', 'PROMOTIONS', 'COMMENTS', 'LEADERS', 'FEEDBACKS'];
export const FETCH = {};

/*
 * Generate different actions.
 */
function creActions() {
	for (let i = 0; i < entities.length; i++) {
		const ent_uc = entities[i];
		const ent_lc = ent_uc.toLowerCase();
		const ent_tc = ent_lc.charAt(0).toUpperCase() + ent_lc.substring(1);
		const ent_one = ent_tc.slice(0, -1); /* chop off last character, e.g. comments -> comment */
		const ent_one_type = ent_one.toUpperCase();

		const entFetch = `fetch${ent_tc}`;
		const entAdd = `add${ent_tc}`;
		const entLoading = `${ent_lc}Loading`;
		const entFailed = `${ent_lc}Failed`;
		const entAddOne = `add${ent_one}`;
		const entPost = `post${ent_one}`;

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
			dispatch(FETCH[entLoading]());
			return fetch(baseUrl + ent_lc )
				.then(response => {
					if (response.ok) { return response; }
					else {
						var error = new Error('Error ' + response.status + ': ' + response.statusText);
						error.response = response;
						throw error;
						}
					},
					error => {
						var errmess = new Error(error.message);
						throw errmess;
						}
					)
				.then(response => response.json())
				.then(data => dispatch(FETCH[entAdd](data)))
				.catch(error => dispatch(FETCH[entFailed](error.message)));
		}

		FETCH[entAddOne] = (data) => ({
			type: ActionTypes.ACT[`ADD_${ent_one_type}`],
			payload: {...data}
		});

		FETCH[entPost] = (data) => (dispatch) => {
			const newData = data;
			newData.date = new Date().toISOString();

			return fetch(baseUrl + ent_lc, {
				method: "POST",
				body: JSON.stringify(newData),
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "same-origin"
			})
				.then(response => {
					if (response.ok) {
						return response;
					} else {
						var error = new Error('Error ' + response.status + ': ' + response.statusText);
						error.response = response;
						throw error;
					}
				},
					error => {
						throw error;
					})
				.then(response => response.json())
				.then(response => {
					dispatch(FETCH[entAddOne](response));
					alert(`Posted ${ent_one}: ${JSON.stringify(response)}`);
					})
				.catch(error => { console.log(`Error: ${entPost}`, error.message); alert(`Your ${ent_one} could not be posted\nError: ${error.message}`); });
		};
	}
}

creActions();
console.log(FETCH);