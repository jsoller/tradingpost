import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input, Row, Col } from 'reactstrap';
// import { getCouncilsIPC, getUnitsIPC } from '../actions/ipcHandler';
import styles from './TradingPost.css';

const CouncilSearch = ({ title }) => (
  <div className={styles.leftsidehdr}>
    <h4 >{title}</h4>
    <Row>
      <Col sm={{ size: 'auto', offset: 0 }}>
        <Label for="councilelect">Council</Label>
    <Input type="select" name="selectCouncil" id="councilSelected"
      className={styles.box}>>
          <option>Simon Kenton Council</option>
      <option>Mid-America Council</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Input>
      </Col>
  <Col sm={{ size: 'auto', offset: 0 }}>
        <Label for="districtSelect">District</Label>
  <Input type="select" name="selectDistrict" id="districtSelected"
    className={styles.box}>>
          <option>Exploring/Learning For Life</option>
    <option>Mid-America Council</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </Input>
      </Col >
  <Col sm={{ size: 'auto', offset: 0 }}>
        <Label for="unitSelect">Unit</Label>
  <Input type="select" name="selectUnit" id="unitSelected"
    className={styles.box}>>
          <option>123</option>
    <option>474</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </Input>
      </Col >
    </Row >
  </div >
);

// CouncilSearch.propTypes = {
//  title: PropTypes.string.isRequired
//} 

export default CouncilSearch
