import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input, Row, Col } from 'reactstrap';
import { getCouncilsIPC, getDistrictsIPC } from '../actions/ipcHandler';
import { connect } from 'react-redux';
import styles from './TradingPost.css';
import { councilSelected, districtSelected } from '../actions/payments';

const CouncilSearch = ({ title, councils, councilSelected, districts, districtSelected, councilSelectedId }) => {
  const c = councils.find(council => council.id == councilSelectedId);
  const orgkey = c === undefined ? "" : c.orgkey;
   
    console.log("orgkey", orgkey)
  
  return (
  <div className={styles.leftsidehdr}>
    <h4 >{title}</h4>
    <Row>
      <Col sm={{ size: 'auto', offset: 0 }}>
        <Label for="councilselect">Council</Label>
        <Input type="select" name="selectCouncil" id="councilSelected" onChange={(event) => councilSelected(event.target.value)}
          className={styles.box}>
          {councils.map(council => <option key={council.id} value={council.id}>{council.council_name}</option>)}
        </Input>
      </Col>
      <Col sm={{ size: 'auto', offset: 0 }}>
      <Label for="districtSelect">District</Label>
        <Input type="select" name="selectDistrict" id="districtSelected" onChange={(event) => districtSelected(event.target.value, orgkey)}
          className={styles.box}>
          {districts.map(district => <option key={district.id} value={district.id}>{district.district_name}</option>)}
        </Input>
        {/* <Label for="districtSelect">District</Label>
        <Input type="select" name="selectDistrict" id="districtSelected"
          className={styles.box}>>
          <option>Exploring/Learning For Life</option>
          <option>Mid-America Council</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input> */}
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
}

// CouncilSearch.propTypes = {
//  title: PropTypes.string.isRequired
//} 

const mapStateToProps = (state) => ({
  councils: state.payments.councils,
  districts: state.payments.districts,
  councilSelectedId: state.payments.councilSelected,
})

export default connect(
  mapStateToProps,
  { councilSelected,
    districtSelected }
)(CouncilSearch)
