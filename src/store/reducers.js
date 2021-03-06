import { combineReducers } from 'redux';

import { SELECT_ITEM, SELECT_CHILDREN, TRANSFER_EPTS, APPLY_EPT, 
	FLUSH_EPTS, SELECT_EPT, SELECT_ALL_EPTS, SET_EPT_APPLICATION,
	APPLY_EPT_TO_CHILDREN } from './actions';
import { generate, deepClone, eptsTypes } from '../GraphGenerator'

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

function data(state=generate(), action) {
	switch (action.type) {
		case TRANSFER_EPTS:
			let [fromPath, toPath] = [action.fromPath, action.toPath];
			let found = {};
			let data = deepClone(state, 'Fabrique', [fromPath, toPath], found);
			try {
				let existing = found[toPath].meta.epts;
				found[fromPath].meta.epts.forEach(ept => {
					if (!existing.includes(ept)) existing.push(ept);
				});
				found[fromPath].meta.epts = [];
			} catch (e) {
				console.log('Unable to transfer EPTs');
			}
			return data;

		case APPLY_EPT:
			let found1 = {};
			let data1 = deepClone(state, 'Fabrique', Object.keys(action.selection), found1);
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
			return data1;

		case FLUSH_EPTS:
			let found2 = {};
			let data2 = deepClone(state, 'Fabrique', Object.keys(action.selection), found2);
			try {
				Object.values(found2).forEach(({meta}) => meta.epts = [])
			} catch (e) {
				console.log('Unable to flush EPTs');
			}
			return data2;

		default:
			return state;

	}
}

function selectedEpts(state=[], action) {
switch (action.type) {
	case SELECT_EPT:
		let selectedEpts = [...state];
		let index = selectedEpts.indexOf(action.ept);
		if (index >= 0) {
			if (!action.state) {
				selectedEpts.splice(index, 1);
			}
		} else {
			if (action.state) {
				selectedEpts.push(action.ept);
			}
		}
		return selectedEpts;

	case SELECT_ALL_EPTS:
		return action.state ? [...action.epts] : [];

	default:
		return state;
	}
}

function selection(state={}, action) {
	switch (action.type) {
		case SELECT_ITEM:
			let selection = Object.assign({}, state);
			if (action.state) {
				selection[action.id] = action.state;
			} else {
				delete selection[action.id];
			}
			return selection;
		
		case SELECT_CHILDREN:
			let selection1 = Object.assign({}, state);
			return setState(action.structure, action.id, !!action.state, selection1, action.state !== 1);

		default:
			return state;
	}
}

function setApplication(data, prefix, ept, state, collector, isRecursive) {
	Object.entries(data.children || {}).forEach(([key, child]) => {
		let applicableTypes = eptsTypes[ept] || [];
		let isApplicable = applicableTypes.includes(child.meta.type);
		let newPrefix = `${prefix}.${key}`;
		if (isApplicable) {
			let key = `${newPrefix}:${ept}`;
			if (state === null) {
				delete collector[key];
			} else {
				collector[key] = !!state;
			}
		}
		if (isRecursive) setApplication(child, newPrefix, ept, state, collector, true);
	});
	return collector;
}

function applicationSelection(state={}, action) {
	switch (action.type) {
		case SET_EPT_APPLICATION:
			let key = `${action.path}:${action.ept}`;
			let result = Object.assign({}, state, {[key]: action.state});
			if (action.state === null) {
				delete result[key]
			}
			return result;
		
		case APPLY_EPT_TO_CHILDREN:
			return setApplication(action.data, action.prefix, action.ept, action.state, Object.assign({}, state), action.state !== 1);

		default:
			return state;
	}
}

const appReducer = combineReducers({
	data,
	selectedEpts,
	selection,
	applicationSelection,
});

export default appReducer;