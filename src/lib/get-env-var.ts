/**
 * Get the value of an environment variable.
 *
 * Helpful to check that they are defined, but also to switch between Astro's
 * method of retrieving the value and the native Node.js
 *
 * Astro uses a helper function which does not work when the project is
 * exported standalone.
 *
 * @export
 * @param {string} key
 * @return {*}  {string}
 */
export function getEnvVar(key: string): string {
	let value: string | undefined = "";

	if (process.env.NODE_ENV === "production") {
		value = process.env[key];
	} else {
		value = import.meta.env[key];
	}

	if (!value) {
		throw new Error(`Environment variable ${key} not found`);
	}

	return value;
}
