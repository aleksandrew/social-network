// outsource dependencies
import { Redirect } from 'react-router-dom';
import React, { PureComponent } from 'react';

// local dependencies
import Setting from './Setting';

class SettingContainer extends PureComponent {
    render () {
        if (!localStorage.getItem('primeryProfile')) {
            return <Redirect to="/login" />;
        }

        return <Setting {...this.props} />;
    }
}

export default SettingContainer;
