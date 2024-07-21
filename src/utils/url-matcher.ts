/**
 * Check if a URL matches any of the patterns in a given list.
 *
 * Supports wildcard (*) matching at end of patterns.
 * Supports negation (!) patterns at beginning of patterns.
 *
 * @export
 * @param {string} url
 * @param {string[]} patterns
 * @return {*}
 */
export function urlMatcher(url: string, patterns: string[]): boolean {
	// Separate positive and negative patterns
	const positivePatterns = patterns.filter(
		(pattern) => !pattern.startsWith("!")
	);
	const negativePatterns = patterns
		.filter((pattern) => pattern.startsWith("!"))
		.map((pattern) => pattern.slice(1));

	// Check if the URL matches any of the negative patterns first
	const isNegated = negativePatterns.some((pattern) =>
		new RegExp("^" + pattern.replace(/\*/g, ".*") + "$").test(url)
	);

	// If it matches a negative pattern, return false (allowed)
	if (isNegated) {
		return false;
	}

	// Otherwise, check if the URL matches any of the positive patterns
	return positivePatterns.some((pattern) =>
		new RegExp("^" + pattern.replace(/\*/g, ".*") + "$").test(url)
	);
}
