import {
	FC,
	Dispatch,
	ReactNode,
	createContext,
	SetStateAction,
	useMemo,
	useState,
} from 'react';

type PageContextType = {
	searchByValue: string;
	setSearchByValue: Dispatch<SetStateAction<string>>;
};

const defaultPageContext = {
	searchByValue: '',
	setSearchByValue: () => {
		return;
	},
};

export const PageContext = createContext<PageContextType>(defaultPageContext);

export const PageProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [searchByValue, setSearchByValue] = useState('');

	const value = useMemo(
		() => ({ searchByValue, setSearchByValue }),
		[searchByValue]
	);

	return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};
