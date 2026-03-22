/**
 * External dependencies.
 */
import { useEffect, useRef } from 'react';
import { ListView, Avatar } from '@rtcamp/frappe-ui-react';
import { useFrappeGetDocList } from 'frappe-react-sdk';

const User = ({ onAuthError }) => {
	const { data, error, isLoading } = useFrappeGetDocList('User', {
		fields: ['name', 'full_name', 'email', 'user_image', 'enabled', 'user_type'],
		orderBy: {
			field: 'full_name',
			order: 'asc',
		},
	});
	const hasHandledAuthError = useRef(false);

	useEffect(() => {
		const statusCode = error?.httpStatus || error?.status || error?.statusCode;

		if (statusCode === 403 && !hasHandledAuthError.current) {
			hasHandledAuthError.current = true;
			onAuthError?.();
		}

		if (!error) {
			hasHandledAuthError.current = false;
		}
	}, [error, onAuthError]);

	if (isLoading) {
		return <p>Loading users...</p>;
	}

	if (error) {
		return <p>Could not load users from Frappe. Sign in again if your session expired.</p>;
	}

	const users = (data || []).map((user) => ({
		...user,
		full_name: user.full_name || user.email || user.name,
		email: user.email || user.name,
	}));

	if (!users || users.length === 0) {
		return <p>No users found.</p>;
	}

	return (
		<ListView
			columns={[
				{
					label: 'Full Name',
					key: 'full_name',
					width: 3,
					getLabel: ({ row }) => row.full_name,
					prefix: ({ row }) => (
						<Avatar
							shape="circle"
							image={row.user_image}
							size="sm"
							label={row.full_name}
						/>
					),
				},
				{
					key: 'email',
					label: 'Email',
					width: '200px',
				},
				{
					key: 'user_type',
					label: 'Type',
					width: '140px',
				},
				{
					key: 'enabled',
					label: 'Status',
					width: '120px',
					getLabel: ({ row }) => (row.enabled ? 'Enabled' : 'Disabled'),
				},
			]}
			options={{
				emptyState: {
					description: 'Create a user in Frappe to see it here.',
					title: 'No users found',
				},
				options: {
					resizeColumn: true,
					selectable: true,
					showTooltip: true,
				},
			}}
			rowKey="name"
			rows={users}
		/>
	);
};

export default User;
