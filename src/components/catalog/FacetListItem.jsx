// renders a list-item element via a Blacklight facet-item
import React from 'react'

const T = React.PropTypes

const FacetListItem = React.createClass({
  propTypes: {
    hits: T.number.isRequired,
    label: T.string.isRequired,
    value: T.string.isRequired,

    onChange: T.func.isRequired,
    selected: T.bool,

    hideCount: T.bool,
  },

  handleClick: function () {
    this.props.onChange(this.props.value, !this.props.selected)
  },

  maybeRenderHits: function () {
    if (
      typeof this.props.hits === 'undefined' 
      || this.props.hits === null
      || this.props.hideCount
    )
      return

    if (this.props.hideCount)
      return

    return <span className="facet-count">{this.props.hits}</span>
  },

  render: function () {
    return (
      <li>
        <span
          className="facet-label"
          onClick={this.handleClick}
        >
          {this.props.label}
        </span>
        {this.maybeRenderHits()}
      </li>
    )
  }
})

export default FacetListItem
