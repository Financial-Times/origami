type SocialFollowIcons = 'twitter'|'facebook'|'linkedin'|'youtube'|'instagram';

export interface SocialFollowProps {
	icons: SocialFollowIcons[];
	standalone: Boolean;
	theme: '' | 'inverse';
}

export function SocialFollow({
	icons = [],
	standalone = false,
	theme = ''
}: SocialFollowProps) {
	const iconClassNames = ['o-social-follow-icon'];

    if(standalone) {
        iconClassNames.push('o-social-follow-icon--standalone');
    }

    if(theme === 'inverse') {
        iconClassNames.push('o-social-follow-icon--inverse');
    }

	return (
        <section className="o-social-follow"  aria-label="Follow on social media">
            {icons.map(icon => {
                const iconDescription = icon === 'twitter' ? `on X, formerly known as Twitter` : `on ${icon}`;
                return <a href="#" className={[...iconClassNames, `o-social-follow-icon--${icon}`].join(' ')}>
                    <span className="o-social-follow-icon__label">{iconDescription}</span>
                </a>
            })}
        </section>
	);
}
