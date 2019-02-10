import React, { Component } from 'react';

import Menu from 'common/components/Menu';

class HeaderContainer extends Component {

    render(){
        return (
            <div id="header">
                <div className="container">
                    <Menu />
                </div>
            </div>
        )
    }
}

export default HeaderContainer;