export const stringToColor = (string?: string) => {
	let hash = 0;
	let i;

	if (!string) {
		return Math.floor(Math.random() * 16777215).toString(16);
	}

	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}

	return color;
};
