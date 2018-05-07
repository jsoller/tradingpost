import React from 'react';
import PropTypes from 'prop-types';
import { getCategoriesIPC } from '../actions/ipcHandler';
import styles from './TradingPost.css';
import { connect } from 'react-redux';

// class QuickProductSearch extends React.Component {
//   constructor(props) {
//     super(props);

//     // this.state = {
//     //   value: undefined,
//     // };
//   }

const QuickProductSearch = ({ categories }) => {
  // render() {
  //   const { categories } = this.props;

  console.log('categories', categories);

  return (
    // < div >{cat1}</div>
    <div>
      <div>
        {categories.forEach((category, i) => {
          return <button key={i} onClick={() => getCategoriesIPC()}>a {category.category}</button>;
        })}
      </div>
      <button onClick={() => getCategoriesIPC()}>categories{1}</button>
    </div >
  );
}
// }

// QuickProductSearch.propTypes = {
//   title: PropTypes.string.isRequired
// }


const mapStateToProps = (state) => ({
  categories: state.login.categories,
})

export default connect(
  mapStateToProps,
  {}
)(QuickProductSearch)