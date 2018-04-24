import h from '@financial-times/x-engine';

export default ({ standfirst, altStandfirst, headlineTesting }) => {
	const displayStandfirst = headlineTesting && altStandfirst ? altStandfirst : standfirst;
	return displayStandfirst ? <p className="o-teaser__standfirst">{displayStandfirst}</p> : null;
};
