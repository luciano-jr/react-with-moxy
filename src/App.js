import React, { PureComponent, PropTypes } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import './App.css';

class App extends PureComponent {
    render() {
        const { children } = this.props;

        return (
            <div className="app">
                <Header />
                { children }
                <Footer />
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element,
};

export default App;
