function calculateRangeFacet (facetGroup) {
  const items = facetGroup.items
  let max = -Infinity
  let min = Infinity
  let totalHits = 0

  let item, value

  for (var i = 0; i < items.length; i++) {
    item = items[i]
    value = +item.value

    if (value < min)
      min = value

    if (value > max)
      max = value

    totalHits += item.hits
  }

  return {
    min: min,
    max: max,
    hits: totalHits,
  }
}
