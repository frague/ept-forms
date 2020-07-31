export const SELECT_ITEM = 'SELECT_ITEM';
export const SELECT_CHILDREN = 'SELECT_CHILDREN';

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