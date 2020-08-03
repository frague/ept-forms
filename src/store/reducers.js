import { SELECT_ITEM, SELECT_CHILDREN, TRANSFER_EPTS, APPLY_EPT, FLUSH_EPTS } from './actions';
import { generate, deepClone } from '../GraphGenerator'

const initialState = {
	data: generate(),
	selection: {}
};

function setState(structure, prefix, state, result, doRecursively=true) {
	if (!structure.children) return result;

	Object.entries(structure.children).forEach(([name, data]) => {
		let key = `${prefix}.${name}`;
		if (state) {
			result[key] = data.meta.type;
		} else {
			delete result[key];
		}
		if (doRecursively) setState(data, key, state, result, true);
	});

	return result;
}

function selectionReducer(state=initialState, action) {
	switch (action.type) {
		case SELECT_ITEM:
			let selection = Object.assign({}, state.selection);
			if (action.state) {
				selection[action.id] = action.state;
			} else {
				delete selection[action.id];
			}
			return Object.assign({}, state, { selection });
		
		case SELECT_CHILDREN:
			let selection1 = Object.assign({}, state.selection);
			return Object.assign(
				{},
				state,
				{ selection: setState(action.structure, action.id, !!action.state, selection1, action.state !== 1) }
			);

		case TRANSFER_EPTS:
			let [fromPath, toPath] = [action.fromPath, action.toPath];
			let found = {};
			let data = deepClone(action.data, 'Fabrique', [fromPath, toPath], found);
			
			try {
				let existing = found[toPath].meta.epts;
				found[fromPath].meta.epts.forEach(ept => {
					if (!existing.includes(ept)) existing.push(ept);
				});
				found[fromPath].meta.epts = [];
			} catch (e) {
				console.log('Unable to transfer EPTs');
			}

			return Object.assign(
				{},
				state,
				{ data }
			);

		case APPLY_EPT:
			let found1 = {};
			let data1 = deepClone(action.data, 'Fabrique', Object.keys(action.selection), found1);
			let ept = action.ept;
			try {
				Object.values(found1).forEach(({meta}) => {
					let epts = meta.epts || [];
					if (!epts.includes(ept)) epts.push(ept);
					meta.epts = epts;
				})
			} catch (e) {
				console.log('Unable to apply EPT');
			}

			return Object.assign(
				{},
				state,
				{ data: data1 }
			);

		case FLUSH_EPTS:
			let found2 = {};
			let data2 = deepClone(action.data, 'Fabrique', Object.keys(action.selection), found2);
			try {
				Object.values(found2).forEach(({meta}) => meta.epts = [])
			} catch (e) {
				console.log('Unable to flush EPTs');
			}

			return Object.assign(
				{},
				state,
				{ data: data2 }
			);

		default:
			return state;
	}
}

export default selectionReducer;