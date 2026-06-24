export type NavigationItem = {
	href: string;
	label: string;
	order?: number;
	kind?: 'blog' | 'sermon' | 'clendar';
	children?: NavigationItem[];
};
