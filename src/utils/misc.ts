export function getEnvOrThrow(name: string) {
	const value = Deno.env.get(name);
	if (value == null) {
		throw new Error(`Missing env variable: ${name}`);
	}
	return value;
}

export function toUppercase(str: string) {
	return str
		.trim()
		.split(' ')
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(' ');
}
