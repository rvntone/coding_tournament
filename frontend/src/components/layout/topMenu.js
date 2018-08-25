import React, { Component } from 'react';
import { Menu, Container, Image, Icon } from 'semantic-ui-react';

import './topMenu.scss';
export default class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.toogleFilter = this.toogleFilter.bind(this);
    this.toogleAddForm = this.toogleAddForm.bind(this);
  }
  toogleFilter() {
    this.props.toogleFilter();
  }
  toogleAddForm() {
    this.props.toogleAddForm();
  }
  render() {
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container fluid>
            <Menu.Item header>
              <Image
                size="mini"
                src="/assets/deliktum_logo_remake.png"
                style={{ width: 100 }}
              />
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Icon name="plus" link onClick={this.toogleAddForm} />
              </Menu.Item>
              <Menu.Item>
                <Icon name="filter" link onClick={this.toogleFilter} />
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </div>
    );
  }
}
