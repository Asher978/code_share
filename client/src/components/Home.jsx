import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const Home = () => {
  return (
    <div>
      <Jumbotron className="main">
        <div className="content">
          <h1 className="display-3">Hello, world!</h1>
          <p className="lead">Intrinsicly optimize extensive web services before empowered architectures..</p>
          <hr className="my-2" />
          <p>Rapidiously provide access to customer directed action items and accurate bandwidth.</p>
          <p className="lead">
            <Button color="primary">Learn More</Button>
          </p>
        </div>
      </Jumbotron>
    </div>
  );
}

export default Home;