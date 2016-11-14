import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import RangeLimit from '../src/components/catalog/RangeLimit.jsx'
import FacetPanel from '../src/components/catalog/FacetPanel.jsx'

const data =  {
  "items": [
    {
      "value": "1974",
      "hits": 6667,
      "label": "1974"
    },
    {
      "value": "2001",
      "hits": 742,
      "label": "2001"
    },
    {
      "value": "2000",
      "hits": 724,
      "label": "2000"
    },
    {
      "value": "2005",
      "hits": 709,
      "label": "2005"
    },
    {
      "value": "2002",
      "hits": 707,
      "label": "2002"
    },
    {
      "value": "2007",
      "hits": 707,
      "label": "2007"
    },
    {
      "value": "2006",
      "hits": 699,
      "label": "2006"
    },
    {
      "value": "2008",
      "hits": 688,
      "label": "2008"
    },
    {
      "value": "2004",
      "hits": 652,
      "label": "2004"
    },
    {
      "value": "2003",
      "hits": 598,
      "label": "2003"
    },
    {
      "value": "2009",
      "hits": 566,
      "label": "2009"
    },
    {
      "value": "2014",
      "hits": 560,
      "label": "2014"
    },
    {
      "value": "2011",
      "hits": 558,
      "label": "2011"
    },
    {
      "value": "2010",
      "hits": 554,
      "label": "2010"
    },
    {
      "value": "2013",
      "hits": 535,
      "label": "2013"
    },
    {
      "value": "1999",
      "hits": 523,
      "label": "1999"
    },
    {
      "value": "2012",
      "hits": 513,
      "label": "2012"
    },
    {
      "value": "2015",
      "hits": 507,
      "label": "2015"
    },
    {
      "value": "1998",
      "hits": 426,
      "label": "1998"
    },
    {
      "value": "2016",
      "hits": 395,
      "label": "2016"
    },
    {
      "value": "1997",
      "hits": 375,
      "label": "1997"
    }
  ],
  "name": "pub_year_tisim",
  "label": "Date"
}

const TestPanel = React.createClass({
	getInitialState: function () {
		return {
			data: this.props.data,
			selected: []
		}
	},

	removeFacet: function (f) {
		this.setState({
			data: this.props.data,
			selected: []
		})
		this.props.onRemoveSelectedFacet(f)
	},

	selectFacet: function (f) {
		const data = this.state.data
		const min = f.value.begin
		const max = f.value.end
		const filteredItems = data.items.filter(facet => {
			return !(facet.value < min || facet.value > max)
		})

		this.setState({
			data: {
				name: data.name,
				label: data.label,
				items: filteredItems,
			},
			selected: [f]
		})

		this.props.onSelectFacet(f)
	},

	render: function () {
		return (
			<FacetPanel
				data={this.state.data}
				onRemoveSelectedFacet={this.removeFacet}
				onSelectFacet={this.selectFacet}
				selectedFacets={this.state.selected}
				type="range"
			/>
		)
	}
})

storiesOf('<RangeLimit />', module)
	.add('default', () => (
		<RangeLimit
			min={1500}
			max={2000}
			onSelectFacet={action('apply range')}
			selectedFacets={[]}
		/>
	))
	.add('panel', () => (
		<TestPanel
			data={data}
			onSelectFacet={action('select facet')}
			onRemoveSelectedFacet={action('remove facet')}
		/>
	))
