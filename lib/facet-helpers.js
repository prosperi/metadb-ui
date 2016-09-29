export function createFacetNameMap (arr, field) {
	if (!field)
		field = 'value'

	const out = {}

	for (let i = 0; i < arr.length; i++)
		if (!out[arr[i][field]])
			out[arr[i][field]] = arr[i].label


	return out
}

export function getBreadcrumbList (pool, selected) {
	let out = []

	if (!selected)
		return out

	const selKeys = Object.keys(selected)

	if (!selKeys.length)
		return out

	for (let p = 0; p < pool.length; p++) {
		if (!selKeys.length)
			break

		let group = pool[p]

		for (let s = 0; s < selKeys.length; s++) {
			let name = selKeys[s]

			if (group.name === name) {
				out = out.concat(selected[name].map(sk => {
					return {
						group: {
							name: pool[p].name,
							label: pool[p].label
						},
						facet: {
							value: sk.value,
							label: sk.label,
						}
					}
				}))

				selKeys.splice(s, 1)
				break
			}
		}
	}

	return [].concat.apply([], out)
}
