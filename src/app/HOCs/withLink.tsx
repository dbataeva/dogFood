import { ComponentType, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

type WithLinkProps = {
	navTo?: string;
};

export const withLink = <P extends object>(
	WrappedComponent: ComponentType<P>
) => {
	const ReturnedComponent: FC<P & WithLinkProps> = (props) => {
		const location = useLocation();
		const { navTo, ...restProps } = props;

		return navTo ? (
			<Link to={navTo} relative={'path'} state={{ prev: location.pathname }}>
				<WrappedComponent {...(restProps as P)} />
			</Link>
		) : (
			<WrappedComponent {...(restProps as P)} />
		);
	};

	return ReturnedComponent;
};
