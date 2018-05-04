import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';


class StorePicker extends React.Component {
  constructor() {
    super();
    this.goToStore = this.goToStore.bind(this);
  }

  static propTypes = {
    history: PropTypes.object,
  }

  myInput = React.createRef();

  goToStore(event) {
    // stop from submitting
    event.preventDefault();
    // get text from input
    const storeName = this.myInput.value.value;
    // change page to store they entered
    this.props.history.push(`/store/${storeName}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}

export default StorePicker;
