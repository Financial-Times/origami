export type PropsType = {
	name: string;
	desciption: string;
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
};
