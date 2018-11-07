import { changeSort } from '../../redux/actions';
import SortLink from './SortLink';
import { connect } from 'react-redux';
import { currentSortSelector } from '../../redux/selectors';

// redux bindings for the SortLink

const mapDispatchToProps = {
    changeSort: changeSort
}

function mapStateToProps(state) {
    return {
        currentSort: currentSortSelector(state)
    };
}

const SortLinkControl = connect(mapStateToProps, mapDispatchToProps)(SortLink);
export default SortLinkControl;