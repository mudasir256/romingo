export const subscribeToNewsletter = (email) => {
	if (!email) {
		return { success: false }
	}
	fetch(
		`https://romingo.us6.list-manage.com/subscribe/post-json?u=585083137c3540a7371e3a74f&id=d4d3932414&EMAIL=${encodeURIComponent(
			email
		)}&c=?`,
		{ mode: "no-cors", method: "POST" }
	)
	return { success: true }
}