import { User } from '~grammy/deps.ts';

export function getFullName(from: User) {
	return from.last_name
		? `${from.first_name} ${from.last_name}`
		: from.first_name;
}
