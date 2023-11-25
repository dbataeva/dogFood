import { List, ListItem, ListItemText } from '@mui/material';
import { FC, memo } from 'react';

type MenuItemsListProps = {
	textArr: string[];
};

export const MenuItemsList: FC<MenuItemsListProps> = memo(({ textArr }) => (
	<List sx={{ padding: 0 }}>
		{textArr.map((itemText) => (
			<ListItem key={itemText}>
				<ListItemText primary={itemText} />
			</ListItem>
		))}
	</List>
));

MenuItemsList.displayName = 'MenuItemsList';
