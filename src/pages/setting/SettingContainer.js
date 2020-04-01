// outsource dependencies
import React, { PureComponent } from 'react';

// local dependencies
import Setting from './Setting';

class SettingContainer extends PureComponent {
    render () {
        return <Setting {...this.props} />;
    }
}

export default SettingContainer;
