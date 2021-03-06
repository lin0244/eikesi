
import React, { Component } from 'react';

import classes from './style.css';

export default class Placeholder extends Component {
    render() {
        return (
            <div className={classes.settings}>
                <a
                    className={classes.button}
                    href="https://github.com/dongyanghe/eikesi"
                    target="_blank">
                   访问 Github
                    <i className="icon-ion-social-github" />
                </a>
            </div>
        );
    }
}
