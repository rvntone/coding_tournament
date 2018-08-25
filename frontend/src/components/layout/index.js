import React, { Component } from 'react';
import TopMenu from './topMenu';
import { Container, Sidebar, Menu, Segment } from 'semantic-ui-react';
import SideMenu from './sideMenu';
import AddForm from '../events/addForm';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterVisible: false,
      addFormVisible: true,
    };
    this.onToogleFilter = this.onToogleFilter.bind(this);
    this.onToogleAddForm = this.onToogleAddForm.bind(this);
  }
  onToogleFilter() {
    const { filterVisible, addFormVisible } = this.state;
    this.setState({
      filterVisible: !filterVisible,
      addFormVisible: !filterVisible ? false : addFormVisible,
    });
  }
  onToogleAddForm() {
    const { addFormVisible, filterVisible } = this.state;
    this.setState({
      addFormVisible: !addFormVisible,
      filterVisible: !addFormVisible ? false : filterVisible,
    });
  }
  onChangeLocation(coords) {
    this.addForm.onChangeLocation(coords);
  }
  renderChildren() {
    const { children } = this.props;
    if (!children) {
      return null;
    }
    return children;
  }
  renderAddFormSideBar() {
    const { addFormVisible } = this.state;
    return (
      <Sidebar
        as={Menu}
        icon="labeled"
        direction="left"
        vertical
        visible={addFormVisible}
        width="very wide"
      >
        {this.renderAddForm()}
      </Sidebar>
    );
  }
  renderAddForm() {
    const { addFormVisible } = this.state;
    if (!addFormVisible) {
      return null;
    }
    return <AddForm />;
  }
  renderSideMenu() {
    const { filterVisible } = this.state;
    return (
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        direction="right"
        vertical
        visible={filterVisible}
        width="very wide"
      >
        <SideMenu />
      </Sidebar>
    );
  }
  render() {
    return (
      <div>
        <TopMenu
          toogleFilter={this.onToogleFilter}
          toogleAddForm={this.onToogleAddForm}
        />
        <Container fluid style={{ paddingTop: 50 }}>
          <Sidebar.Pushable as={Segment}>
            {this.renderAddFormSideBar()}
            {this.renderSideMenu()}
            <Sidebar.Pusher>{this.renderChildren()}</Sidebar.Pusher>
          </Sidebar.Pushable>
        </Container>
      </div>
    );
  }
}
