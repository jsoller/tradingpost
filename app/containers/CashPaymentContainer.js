import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CashEntryInfo from '../components/CashEntryInfo';

const CashPaymentContainer = () => (
    <CashEntryInfo title="Cash Payment">
    </CashEntryInfo>
);

const mapStateToProps = (state) => ({
})

export default connect(
    mapStateToProps,
    {}
)(CashPaymentContainer)
