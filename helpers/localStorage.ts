const get = (key: string): any => {
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	} catch (error) {
		console.error(error);
	}
};

const set = (key: string, value: any): void => {
	localStorage.setItem(key, JSON.stringify(value));
};

const getFromObject = (key: string, property: string): any => {
	const object = get(key);

	return object ? (property in object ? object[property] : null) : null;
};

const setToObject = (key: string, property: string, value: any) => {
	const object = get(key);
	if (object) {
		object[property] = value;
		set(key, object);
	} else {
		set(key, { [property]: value });
	}
};

const remove = (key: string): void => {
	localStorage.removeItem(key);
};

const removeAll = (): void => {
	localStorage.clear();
};

export { removeAll, getFromObject, get, remove, set, setToObject };
