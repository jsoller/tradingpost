import React, { Component } from 'react';
import { Button } from 'reactstrap';
// import { getCouncilsIPC, getUnitsIPC } from '../actions/ipcHandler';
import { loadCSVFileNameIPC, saveCSVFileNameIPC } from '../actions/ipcHandler';
import styles from './TradingPost.css';
import { remote } from 'electron';

// import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

{/* <script>

var remote = require('remote');

var dialog = remote.require('dialog');

</script> */}

// type Props = {};


// const {dialog} = require('electron')

const openFile = () => {

    remote.dialog.showOpenDialog(function (filenames) {
        console.log(filenames[0]);
        loadCSVFileNameIPC(filenames[0]);
    });

}

const saveFile = () => {

    remote.dialog.showSaveDialog(function (filenames) {
        console.log(filenames[0]);
        saveCSVFileNameIPC(filenames[0]);
    });

}

export default class FileProcessing extends Component<Props> {
    // props: Props;



    render() {

        return (
            < div className={styles.leftsidehdr} >
                <Button
                    id="openFile"
                    block
                    className="sm"
                    onClick={() => openFile()}>
                    Open File
                    </Button>

                <Button
                    id="saveFile"
                    block
                    className="sm"
                    onClick={() => saveFile()}>
                    Save File
                </Button>
                <br />

                <br />

                {/* <textarea id="editor" style="width: 400px; height: 300px;"></textarea> */}


            </div>
        );
    }
}

// const mapStateToProps = (state) => ({
//     loginsuccessful: state.login.locationusers.length !== 0,
// })

// export default connect(
//     mapStateToProps,
//     {}
// )(FileProcessing)
