// renders a list-item element via a Blacklight facet-item
import React from 'react'
import assign from 'object-assign'

const T = React.PropTypes

const FacetListItem = React.createClass({
  propTypes: {
    hits: T.number.isRequired,
    label: T.string.isRequired,
    value: T.string.isRequired,

    onClick: T.func.isRequired,
    hideCount: T.bool,
  },

  getLabelStyle: function () {
    return {
      borderBottom: '1px dotted #aaa',
      cursor: 'pointer',
    }
  },

  maybeRenderHits: function (style) {
    if (
      typeof this.props.hits === 'undefined' 
      || this.props.hits === null
      || this.props.hideCount
    )
      return

    if (this.props.hideCount)
      return

    return <span className="facet-count" style={style}>{this.props.hits}</span>
  },

  render: function () {
    const styles = {
      item: {
        margin: '5px 0',
        position: 'relative',
      },
      label: this.getLabelStyle(),
      count: {
        right: '0',
        position: 'absolute',
      },
    }

    const facet = {
      hits: this.props.hits,
      label: this.props.label,
      value: this.props.value,
    }

    return (
      <li style={styles.item}>
        <span
          className="facet-label"
          onClick={this.props.onClick.bind(null, facet)}
          style={styles.label}
        >
          {this.props.label}
        </span>
        {this.maybeRenderHits(styles.count)}
      </li>
    )
  }
})

export default FacetListItem
