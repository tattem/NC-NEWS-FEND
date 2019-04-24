import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/Nav.css';
import * as api from './Api';
import React, { Component } from 'react';
import { Link } from '@reach/router';

class Nav extends Component {
  state = {
    topics: []
  };
  render() {
    return (
      <DropdownButton
        id="dropdown"
        title={<img id="N" src={require('../images/N.png')} width="100%" />}
        rootCloseEvent="click"
      >
        <Dropdown.Item>
          <Link to="/">Home</Link>
        </Dropdown.Item>
        {this.state.topics.map(topic => (
          <Dropdown.Item>
            <Link to={`/${topic.slug}/articles`}>{topic.slug}</Link>
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  }
  componentDidMount = async () => {
    await this.fetchTopics();
  };
  componentDidUpdate = async (prevProps, prevState) => {
    // needs to be prev props. console log it to see.
    console.log(this.props, 'the properties');
    //   if (this.props.topic !== prevProps) {

    //         await this.fetchTopics();
    //         }
  };

  fetchTopics = async () => {
    try {
      const topics = await api.getTopics();
      console.log(topics, '<< get');
      this.setState(state => {
        return {
          topics: topics
        };
      });
    } catch (err) {}
    console.log(this.state, '< state after ');
  };
}

export default Nav;
