import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo-twinchat.png'
import sygnet from '../../assets/img/brand/twinexchange.png'
import * as Constants from '../../constants/constants';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 57, height: 'auto', alt: Constants.TITLEAPP }}
          minimized={{ src: logo, width: 30, height: 30, alt: Constants.TITLEAPP }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />     
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
