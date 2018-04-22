import React from 'react';
import styles from '../components/TradingPost.css';
import { div, FormGroup, Label, Input, Button } from 'reactstrap';

const promptbox = () => (

    <React.Fragment>
        <div className={styles.prompt_box_background} />
        <div className={styles.prompt_box}>
            <FormGroup check className="sm">
                <Label>Enter Credit Card Authorization</Label>
                <Input
                    autoFocus
                    type="text"
                    // value={this.state.username}
                    // onChange={(event) => this.handleChange(event, 'username')}
                />
            </FormGroup>
            <button >Submit</button>
            <button >Cancel</button>
        </div>
        {/* </div> */}
    </React.Fragment >
);

export default promptbox;