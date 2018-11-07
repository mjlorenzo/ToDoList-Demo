import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';

// this control handles page changes for the todo list

class PageHandler extends PureComponent
{
    constructor(props)
    {
        super(props);

        this.prevClick = this.prevClick.bind(this);
        this.nextClick = this.nextClick.bind(this);       
    }

    // handlers for clicking the next and previous page buttons
    nextClick(event)
    {
        this.props.changePage(this.props.currentPage + 1);
    }

    prevClick(event)
    {
        this.props.changePage(this.props.currentPage - 1);
    }

    render()
    {
        return (
            <div className='pageControl'>
                <button disabled={this.props.currentPage <= 1} onClick={this.prevClick}>Prev</button>
                <span>{this.props.currentPage + " of " + this.props.lastPage}</span>
                <button disabled={this.props.currentPage >= this.props.lastPage}onClick={this.nextClick}>Next</button>
            </div>
        )
    }
}

PageHandler.propTypes = {
    currentPage: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired
}

export default PageHandler;