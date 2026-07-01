import { reference } from 'astro:content';
import { z } from 'astro/zod';

// TODO: Add parsing for verse reference
// TODO: Double check date parsing

export const SermonSchema = z.object({
	title: z.string(),
	date: z.date(),
	series: reference('series'),
	scriptures: z.array(z.string()).optional(),
	preacher: reference('preachers'),
	mediaURL: z.string().optional(),
	bulletinURL: z.string().optional(),
});
