import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Header extends Component {

    renderLinks() {
        if (!this.props.authenticated) {
            return [
                <li className="nav-item" key={0}>
                    <Link to="/signin">Sign In</Link>
                </li>,
                <li className="nav-item" key={1}>
                    <Link to="/signup">Sign Up</Link>
                </li>
            ]
        } else {
            return (
                <li className="nav-item">
                    <Link to="/signout">Sign Out</Link>
                </li>
            )

        }
    }

    render() {
        return (
            <nav className="navbar navbar-light">
                <h7><Link to="/">Redux Auth</Link></h7>
                <ul className="nav navbar-nav float-right">
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(Header);