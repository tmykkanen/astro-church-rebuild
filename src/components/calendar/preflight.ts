import {
	PUBLIC_GOOGLE_CALENDAR_API_KEY,
	PUBLIC_GOOGLE_CALENDAR_ID,
} from 'astro:env/client';

export const preflight = async () => {
	const response = await fetch(
		`https://www.googleapis.com/calendar/v3/calendars/${PUBLIC_GOOGLE_CALENDAR_ID}/events?key=${PUBLIC_GOOGLE_CALENDAR_API_KEY}`,
	);

	if (!response.ok) {
		const json = await response.json();
		return {
			ok: false,
			error: json.error,
		};
	}

	return { ok: true };
};
