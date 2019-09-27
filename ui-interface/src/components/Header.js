import React from 'react'
import {Header as UIHeader} from 'semantic-ui-react';



class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <UIHeader disabled>
        {this.props.label}
      </UIHeader>
    );
  }
}

export default Header;
