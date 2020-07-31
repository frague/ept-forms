import { SELECT_ITEM, SELECT_CHILDREN } from './actions';

const initialState = {
	selection: {}
};

function setState(structure, prefix, state, result) {
	if (!structure.children) return result;

	Object.entries(structure.children).forEach(([name, data]) => {
		let key = `${prefix}.${name}`;
		if (state) {
			result[key] = true;
		} else {
			delete result[key];
		}
		setState(data, key, state, result);
	});

	return result;
}

function selectionReducer(state=initialState, action) {
	switch (action.type) {
		case SELECT_ITEM:
			let selection = Object.assign({}, state.selection);
			if (action.state) {
				selection[action.id] = true;
			} else {
				delete selection[action.id];
			}
			return Object.assign({}, state, { selection });
		
		case SELECT_CHILDREN:
			let selection1 = Object.assign({}, state.selection);
			return Object.assign(
				{},
				state,
				{ selection: setState(action.structure, action.id, action.state, selection1) }
			);

		default:
			return state;
	}
}

export default selectionReducer;