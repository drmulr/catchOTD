import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" age={100} />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
