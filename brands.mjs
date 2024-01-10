import fs from 'fs'
const componentNames = fs.readdirSync('./components')
const counts = {}
const packages = componentNames.forEach(component =>{
		const brands = JSON.parse(fs.readFileSync(`./components/${component}/origami.json`, 'utf8')).brands || []
		const brandsIdentifier = brands.sort().join(':')
		const brandsCount = brands.length;
		counts[brandsIdentifier] = counts[brandsIdentifier] || 0
		counts[brandsIdentifier]++

		// console.log(component, brands)
			// .map(dep => ([component.replace(/-/g, '_'), dep.replace(/-/g, '_')]) )
			// .map(([comp, dep]) => `    ${comp} --> ${dep}`)
			// .filter(text => !/o_typography|o_brand|o_colors|o_utils|o_normalise|o_spacing|o_fonts|o_icons|o_grid/.test(text))
})
console.log(counts)
// .join('\n')
// console.log(packages)
// console.log(componentNames.join('\n'))
// console.log(`stateDiagram-v2
// ${packages}`)
