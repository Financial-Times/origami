export type PropsType = {
	name: string;
	description: string;
	keywords: string[];
	team: {
		email: string;
		slack: string;
		githubTeam: string;
	};
	status: string;
	brands: string[];
	javascript: boolean;
	scss: boolean;
	lowercase?: (string: string) => string;
	titleCase?: (string: string) => string;
	camelCase?: (string: string) => string;
	withoutPrefix?: (string: string) => string;
};
