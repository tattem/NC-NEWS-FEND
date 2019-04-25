import '../css/Nav.css';
import * as api from './Api';
import React, { Component } from 'react';
import { Link } from '@reach/router';

class Nav extends Component {
  state = {
    topics: [],
    displayMenu: false
  };

  render() {
    console.log('rendering');
    return (
      <div className="dropdown" style={{ background: 'red', width: '200px' }}>
        <div className="button" onClick={this.showDropdownMenu}>
          <img
            id="N"
            src={require('../images/N.png')}
            width="100%"
            alt="dropdown"
          />
        </div>

        {this.state.displayMenu ? (
          <ul id="dropdownMenu">
          <li id="dropdown-list">
                <Link to={`/`}>Home</Link>
              </li>
            {this.state.topics.map(topic => (
              <li id="dropdown-list">
                <Link to={`/${topic.slug}/articles`}>{topic.slug}</Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

    );
  }
  componentDidMount = async () => {
    await this.fetchTopics();
  };

  showDropdownMenu = event => {
    event.preventDefault();
    this.setState(
      state => {
        return {
          topics: state.topics,
          displayMenu: true
        };
      },
      () => {
        document.addEventListener('click', this.hideDropdownMenu);
      }
    );
  };

  hideDropdownMenu = () => {
    this.setState(
      state => {
        return {
          topics: state.topics,
          displayMenu: false
        };
      },
      () => {
        document.removeEventListener('click', this.hideDropdownMenu);
      }
    );
  };

  fetchTopics = async () => {
    try {
      const topics = await api.getTopics();
      this.setState(state => {
        return {
          topics: topics,
          topic: this.props.topic
        };
      });
    } catch (err) {}
  };

}

export default Nav;
