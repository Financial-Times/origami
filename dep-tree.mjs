import fs from 'fs'
const componentNames = fs.readdirSync('./components')
const packages = componentNames.flatMap(component =>
		Object.keys(JSON.parse(fs.readFileSync(`./components/${component}/package.json`, 'utf8')).peerDependencies || {})
			.filter(name => name.startsWith('@financial-times/o-'))
			.map(name => name.replace('@financial-times/', ''))
			.map(dep => ([component, dep]) )
			.map(([a,b]) => `${a}\t${b}`)
			// .map(dep => ([component.replace(/-/g, '_'), dep.replace(/-/g, '_')]) )
			// .map(([comp, dep]) => `    ${comp} --> ${dep}`)
			// .filter(text => !/o_typography|o_brand|o_colors|o_utils|o_normalise|o_spacing|o_fonts|o_icons|o_grid/.test(text))
).join('\n')
console.log(packages)
console.log(componentNames.join('\n'))
// console.log(`stateDiagram-v2
// ${packages}`)
