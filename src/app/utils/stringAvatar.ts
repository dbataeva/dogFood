import { stringToColor } from './stringToColor';

export const stringAvatar = (name?: string, avatar?: string) => {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		src: avatar,
		children: name
			? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
			: undefined,
	};
};
