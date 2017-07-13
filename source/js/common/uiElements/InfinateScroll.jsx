/**
 * Created by RobertSabiryanov on 13.06.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';

class InfinateScroll extends React.Component {
    render() {
        const {loading, loadNext, totalCount} = this.props;
        const listLength = this.props.listLength || 50;
        let className = 'table_row';
        let loadingStyles = null;
        if (loading) {
            className += ' loading_block';
            loadingStyles = {minHeight: '50px'};
        }
        return (<div class={className} style={loadingStyles}>
            {totalCount >= listLength && <Waypoint
                onEnter={loadNext}/>}
        </div>)
    }
}

InfinateScroll.propTypes = {
    loadNext: PropTypes.func.isRequired, //функция которая будет вызвана для подгрузки последующих элементов
    totalCount: PropTypes.number.isRequired, //общее максимально количество элементов в списке
    loading: PropTypes.bool, //флаг, который говорит о том, что идет подгрузка
    listLength: PropTypes.number //количество элементов на 1 экране списка, по умолчанию 50
};

export default InfinateScroll;