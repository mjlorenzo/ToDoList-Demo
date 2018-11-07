import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// this component issues a CHANGE_SORT action when clicked

class SortLink extends PureComponent
{
    constructor(props)
    {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event)
    {
        // if the current sort is descending, switch to ascending
        // otherwise descending is the first option
        let sort = this.props.currentSort === this.props.sorts.descending ? 
                    this.props.sorts.ascending : this.props.sorts.descending;
        this.props.changeSort(sort);
    }

    render()
    {
        let glyph = "";
        let text = this.props.text;

        // this logic renders an up or down arrow glyph depending on the current sort
        // if the current sort doesn't belong to this SortLink, no glyph is appended to the display
        if (this.props.currentSort === this.props.sorts.descending) {
            glyph = "\u25BC";
        }
        else if (this.props.currentSort === this.props.sorts.ascending) {
            glyph = "\u25B2";
        }

        return (
            <div className={this.props.className} onClick={this.handleClick}>
                {text + glyph}
            </div>
        )
    }
}

SortLink.propTypes = {
    sorts: PropTypes.shape({
        ascending: PropTypes.func.isRequired,
        descending: PropTypes.func.isRequired
    }),
    changeSort: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    currentSort: PropTypes.func.isRequired
};

export default SortLink;
