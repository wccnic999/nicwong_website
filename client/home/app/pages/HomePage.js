import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { getCategoryList } from 'category/reducers/categoryList';
import { getWorkList } from 'work/reducers/workList';

import classesTop from 'styles_path/home/HomePageTop';
import classesMid from 'styles_path/home/HomePageMid';

class HomePage extends Component {

    componentWillMount() {
        const { getCategoryList, getWorkList } = this.props;
        getCategoryList();
        getWorkList();
    }

    componentDidMount() {
        window.addEventListener('scroll', _.debounce(() =>{// lodash debounce method.
            let supportPageOffset = window.pageXOffset !== undefined;
            let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
            let scroll = {
               x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
               y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
            };

            if(scroll.y > 2){
                this.scrollDown();
            }
            else{
                this.scrollUp();
            }
        }, 0));//ms
    }

    scrollUp() {
        const outerWrapper = document.getElementById('outer-container');
        outerWrapper.classList.remove('scrolled');
    }

    scrollDown() {
        const outerWrapper = document.getElementById('outer-container');
        outerWrapper.classList.add('scrolled');
    }

    renderWelcome() {
        return (
            <div className={`${classesTop.welcome}`}>
                <h1>Hi, I'm Nic - a web focused programmer who<br/>make complex ideas simple & obvious.</h1>
            </div>
        )
    }

    renderWorksSection() {
        const { categoryList, workList } = this.props;
        console.log(workList);
        return (
            <section className={`${classesMid.worksSection}`} ref="works">
                <div className="seperate"></div>
                <div className={`${classesMid.filter}`}>
                    <a href="javascript:;" className="ball" data-cate="all"><span>All</span><i className="fas fa-circle"></i></a>
                    {categoryList.map((child, x) => {
                        return (
                            <a key={x} href="javascript:;" className="ball" data-cate={child.slug}><span>{child.name}</span><i className="fas fa-circle"></i></a>
                        )
                    })
                    }
                </div>
            </section>
        )
    }

    render() {
        return (
            <div className="page page-home">
                <div className="container">
                    {this.renderWelcome()}
                    {this.renderWorksSection()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    screen_size_type: state.app.responsive.type,
    categoryList: state.category.categoryList.data,
    workList: state.work.workList.data
});

const mapDispatchToProps = {
    getCategoryList,
    getWorkList
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
