import { GenericID } from '@/types';

const indexOfItems = <T extends GenericID>(state: T[], id: number | string): number => {
	const findIndex = state.findIndex((data) => data.id === id);
	return findIndex;
};

const findById = <T extends GenericID>(state: T[], id: number | string): T | undefined => {
	return state.find((data) => data.id === id) ?? undefined;
};

const multipleDelete = <T extends GenericID>(state: T[], deleteIds: Array<string | number>): T[] => {
	return state.filter((data) => !deleteIds.includes(data.id));
};

const add = <T extends GenericID>(state: T[], object: T): T[] => {
	const index = indexOfItems(state, object.id);
	if (index === -1) return [...state, object];

	return state;
};

const singleDelete = <T extends GenericID>(state: T[], id: number | string): T[] => {
	const index = indexOfItems(state, id);
	const items: T[] = [...state];
	if (index > -1) return items.splice(index, 1);
	return items;
};

const update = <T extends GenericID>(state: T[], object: T): T[] => {
	const index = indexOfItems(state, object.id);
	const items: T[] = [...state];
	const genericObj: T = { ...object };

	if (index > -1) {
		for (const key in genericObj) {
			if (key in items[index]) {
				items[index][key] = genericObj[key];
			}
		}
	}
	return items;
};

export { update, singleDelete, add, multipleDelete, findById, indexOfItems };
