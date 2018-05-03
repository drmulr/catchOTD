import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';


class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  }

  componentDidMount() {
    // this ref is firebase - diff than form ref
    // a little lengthy...so this.props.match.params.storeId to:
    const { params } = this.props.match;
    // need reinstate localStorage first
    const localStorageRef = localStorage.getItem(params.storeId);
    console.log(localStorageRef);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // how do we modify state?
    // first take copy
    const fishes = { ...this.state.fishes };
    // add our new fish to variable
    fishes[`fish${Date.now()}`] = fish;
    // set new fishes object to state
    this.setState({ fishes });
  }

  updateFish = (key, updatedFish) => {
    // take copy of current state
    const fishes = { ...this.state.fishes };
    // update state
    fishes[key] = updatedFish;
    // set to state
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    // take copy of state
    const fishes = { ...this.state.fishes };
    // update state
    fishes[key] = null;
    // update state
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  }

  addToOrder = (key) => {
    // copy of state
    const order = { ...this.state.order };
    // add to order, or update num in order
    order[key] = order[key] + 1 || 1;
    // call setState to update state object
    this.setState({ order });
  }

  removeFromOrder = (key) => {
    // copy of state
    const order = { ...this.state.order };
    // remove from order - can use delete because not mirroring to DB
    delete order[key];
    // call setState to update state object
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" age={100} />
          <ul>
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
          />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
