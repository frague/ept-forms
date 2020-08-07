export const SELECT_ITEM = 'SELECT_ITEM';
export const SELECT_CHILDREN = 'SELECT_CHILDREN';

export const TRANSFER_EPTS = 'TRANSFER_EPTS';
export const APPLY_EPT = 'APPLY_EPT';
export const FLUSH_EPTS = 'FLUSH_EPTS';

export const SELECT_EPT = 'SELECT_EPT';
export const SELECT_ALL_EPTS = 'SELECT_ALL_EPTS';

export const SET_EPT_APPLICATION = 'SET_EPT_APPLICATION';
export const APPLY_EPT_TO_CHILDREN = 'APPLY_EPT_TO_CHILDREN';

export function selectItem(id, state) {
	return {
		type: SELECT_ITEM,
		id, state
	};
}

export function selectChildren(structure, id, state) {
	return {
		type: SELECT_CHILDREN,
		structure, id, state
	};
}

export function transferEPTs(fromPath, toPath) {
	return {
		type: TRANSFER_EPTS,
		fromPath, toPath
	}
}

export function applyEPT(selection, ept) {
	return {
		type: APPLY_EPT,
		selection, ept
	}
}

export function flushEPTs(selection, ept) {
	return {
		type: FLUSH_EPTS,
		selection
	}
}

export function selectEpt(ept, state) {
	return {
		type: SELECT_EPT,
		ept, state
	}
}

export function selectAllEpts(epts, state) {
	return {
		type: SELECT_ALL_EPTS,
		epts, state
	}
}

export function setEptApplication(path, ept, state) {
	return {
		type: SET_EPT_APPLICATION,
		path, ept, state
	}
}

export function applyEptToChildren(data, prefix, ept, state) {
	return {
		type: APPLY_EPT_TO_CHILDREN,
		data, prefix, ept, state
	}
}