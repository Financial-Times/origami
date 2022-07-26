import {HeaderWrapper, TopWrapper, TopColumnCenter} from './top';

export function LogoOnlyHeader({
	showLogoLink,
	variant,
}: {
	showLogoLink?: boolean;
	variant?: string;
}) {
	return (
		<HeaderWrapper variant={variant}>
			<TopWrapper>
				<TopColumnCenter showLogoLink={showLogoLink} />
			</TopWrapper>
		</HeaderWrapper>
	);
}
