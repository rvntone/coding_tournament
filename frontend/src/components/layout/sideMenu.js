import React, { Component } from 'react';
import { Menu, Accordion } from 'semantic-ui-react';
import EventList from '../events/eventList';
import Filter from '../events/filter';
import PhotoList from '../events/photoList';

import './sideMenu.scss';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <Accordion className="filterMenu" fluid as={Menu} vertical>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 0}
            content="Eventos"
            index={0}
            onClick={this.handleClick}
          />
          <Accordion.Content
            active={activeIndex === 0}
            content={<EventList />}
          />
        </Menu.Item>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 1}
            content="Fotos"
            index={1}
            onClick={this.handleClick}
          />
          <Accordion.Content
            active={activeIndex === 1}
            content={<PhotoList />}
          />
        </Menu.Item>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 2}
            content="Filtro"
            index={2}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 2} content={<Filter />} />
        </Menu.Item>
      </Accordion>
    );
  }
}
