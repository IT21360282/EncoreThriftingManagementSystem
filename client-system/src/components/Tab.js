import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    }

    render() {
        const {
            onClick,
            props: {
                activeTab,
                label,
            },
        } = this;

        let className = 'tab-list-item';
        let iconClass = 'icon';

        if (activeTab === label) {
            iconClass = 'iconActive';
          }
        return ( 
        <li className = { className }onClick = { onClick } >
            <button className={iconClass}>{ label }</button>
        </li>
        );
    }
}

export default Tab;