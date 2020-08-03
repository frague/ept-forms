export const SELECT_ITEM = 'SELECT_ITEM';
export const SELECT_CHILDREN = 'SELECT_CHILDREN';
export const TRANSFER_EPTS = 'TRANSFER_EPTS';
export const APPLY_EPT = 'APPLY_EPT';
export const FLUSH_EPTS = 'FLUSH_EPTS';

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

export function transferEPTs(data, fromPath, toPath) {
	return {
		type: TRANSFER_EPTS,
		data, fromPath, toPath
	}
}

export function applyEPT(data, selection, ept) {
	return {
		type: APPLY_EPT,
		data, selection, ept
	}
}

export function flushEPTs(data, selection, ept) {
	return {
		type: FLUSH_EPTS,
		data, selection
	}
}