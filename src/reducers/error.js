// handle errors
import { 
	FETCH_ERROR,
	REMOVE_ERROR,
} from '../actions/constants'

export default function errorReducer (state, action) {
	if (state === undefined) return {}

	switch (action.type) {
		case FETCH_ERROR:
			return action.data

		case REMOVE_ERROR:
			return {}

		default:
			return state
	}
}
