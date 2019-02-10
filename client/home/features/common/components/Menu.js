import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import classes from 'styles_path/common/Menu';

class Menu extends Component{

    scrollTo(id) {
        console.log(id);
    }

    render(){
        return(
            <div className={`${classes.menu} clearfix`}>
                <ul>
                    <li>
                        <a href="javascript:;" className="ball" data-target="works" onClick={() => this.scrollTo('works')}><span>Works</span><i className="fas fa-circle"></i></a>
                    </li>
                    <li>
                        <a href="javascript:;" className="ball" data-target="contact" onClick={() => this.scrollTo('contact')}><span>Contact</span><i className="fas fa-circle"></i></a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Menu;