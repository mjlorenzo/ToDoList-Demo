import { connect } from 'react-redux';
import { changePage } from '../../redux/actions';
import { currentPageSelector, pageFirstIndexSelector, lastPageSelector } from '../../redux/selectors';
import PageHandler from './PageHandler';

// redux bindings for the PageControl component

const mapDispatchToProps = {
    changePage: changePage
}

function mapStateToProps(state) {
    return {
        currentPage: currentPageSelector(state),
        lastPage: lastPageSelector(state)
    }
}

const PageControl = connect(mapStateToProps, mapDispatchToProps)(PageHandler);
export default PageControl;