// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsIPC } from '../actions/ipcHandler';

type Props = {};

export default class Home extends Component<Props> {
    props: Props;

    render() {
        return (
            <div>
                <Link to="/">Home </Link>
                <Link to="/counter">  Inventory </Link>
                <Link to="/p">  Point of Sale </Link>
                <button onClick={() => getProductsIPC('productByType', 'F')}>
                    Refresh
                </button>
            </div>
        );
    }
}
