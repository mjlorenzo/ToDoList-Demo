import React from 'react';
import { Component } from 'react';
import { changeSort } from '../actions';
import { connect } from 'react-redux';

const mapDispatchToProps = {
    changeSort: changeSort
}

function mapStateToProps(state) {
    return {
        currentSort: state.currentSort
    };
}

// this component issues a CHANGE_SORT action when clicked

class RRSortLink extends Component
{
    constructor(props)
    {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event)
    {
        let sort = this.props.currentSort === this.props.sorts.descending ? 
                    this.props.sorts.ascending : this.props.sorts.descending;
        this.props.changeSort(sort);
    }

    render()
    {
        let glyph = "";
        let text = this.props.text;

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

var SortLink = connect(mapStateToProps, mapDispatchToProps)(RRSortLink);
export default SortLink;
