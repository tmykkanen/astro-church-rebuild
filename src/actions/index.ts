import { defineAction } from 'astro:actions';
import { RESEND_API_KEY, RESEND_SEGMENT_ID } from 'astro:env/server';
import { z } from 'astro/zod';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

const SubscribeSchema = z.object({
	firstName: z.preprocess(
		(value) => (value === null ? '' : value),
		z.string().trim().min(2, 'Must be at least 2 characters.'),
	),
	lastName: z.preprocess(
		(value) => (value === null ? '' : value),
		z.string().trim().min(2, 'Must be at least 2 characters.'),
	),
	email: z.preprocess(
		(value) => (value === null ? '' : value),
		z.email('Enter a valid email address.'),
	),
	_gotcha: z.string().optional(),
});

export const server = {
	subscribeClient: defineAction({
		accept: 'form',
		input: SubscribeSchema,
		handler: async ({ _gotcha, firstName, lastName, email }) => {
			if (_gotcha) {
				// Pretend it worked.
				return {
					message: 'Thank you! You have been subscribed.',
				};
			}

			const { error } = await resend.contacts.create({
				email,
				firstName,
				lastName,
				unsubscribed: false,
				segments: [{ id: RESEND_SEGMENT_ID }],
			});

			if (error) {
				return {
					ok: false,
					message: 'Error subscribing. Please try again.',
				};
			}

			return {
				ok: true,
				message: `Thanks for subscribing, ${firstName}!`,
			};
		},
	}),
};
