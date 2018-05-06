import React from 'react';
import { Label, Input, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import styles from '../TradingPost.css';
import { councilSelected, unittypeSelected, unitSelected } from '../../actions/payments';
import Select from 'react-select';

class CouncilSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: undefined,
    };
  }

  render() {
    const { councils, councilSelected, unittypes, unittypeSelected, units, unitSelected, councilSelectedId } = this.props;
    const c = councils.find(council => council.id == councilSelectedId);
    const orgkey = c === undefined ? "" : c.orgkey;

    console.log("orgkey", orgkey)

    const unitAdd = (event) => {
      if (units.length === 0) {
        alert("enter a unit");
      }
    };

    const unitOptions = units.map(unit => { return { value: unit.id, label: unit.nbr + ' ' + unit.charter_org_name }; });

    return (
      <div className={styles.leftsidehdr}>
        <h4>Unit Account Payment</h4>
        <Row>
          <Col sm={{ size: 'auto', offset: 0 }}>
            <Label for="councilselect">Council</Label>
            <Input type="select" name="selectCouncil" id="councilSelected" onChange={(event) => {
              councilSelected(event.target.value);
              this.setState({ value: undefined }); // Reset selected value
            }}
              className={styles.box}>
              {councils.map(council => <option key={council.id} value={council.id}>{council.nme}</option>)}
            </Input>
          </Col>
          <Col sm={{ size: 'auto', offset: 0 }}>
            <Label for="unittypeSelect">Unit Type</Label>
            <Input type="select" name="selectUnitType" id="unittypeSelected" onChange={(event) => unittypeSelected(event.target.value)}
              className={styles.box}>
              {unittypes.map(unittype => <option key={unittype.id} value={unittype.id}>{unittype.nme}</option>)}
            </Input>
          </Col >
          <Col sm={{ size: 'auto', offset: 0 }}>
            <Label for="unitSelect">Unit</Label>
            {units.length > 0
              ? <Select
                className={styles.council_search_unit_entry_box}
                options={unitOptions}
                onChange={(value) => this.setState({ value })}
                value={this.state.value}
              />
              : <Select.Creatable
                className={styles.council_search_unit_entry_box}
                options={unitOptions}
                onChange={(value) => this.setState({ value })}
                value={this.state.value}
              />
            }
          </Col >
        </Row >
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  councils: state.payments.councils,
  unittypes: state.payments.unittypes,
  units: state.payments.units,
  councilSelectedId: state.payments.councilSelected,
})

export default connect(
  mapStateToProps,
  {
    councilSelected,
    unittypeSelected,
    unitSelected
  }
)(CouncilSearch)
