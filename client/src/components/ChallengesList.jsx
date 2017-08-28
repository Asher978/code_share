import React, { Component } from 'react';
import challenge from '../challenge/challenge';
import { Link } from 'react-router-dom';
import { 
  ListGroup, 
  ListGroupItem, 
  ListGroupItemHeading, 
  ListGroupItemText 
} from 'reactstrap';

class Challenges extends Component {
  render () {
    return (
      <ListGroup>
      {challenge.map(c => {
        return (
          <ListGroupItem key={c.id}>
            <ListGroupItemHeading><Link to={`/challenges/${c.id}`}>Challenge # {c.id}</Link></ListGroupItemHeading>
            <ListGroupItemText>{c.chall}</ListGroupItemText>
          </ListGroupItem>
          )
        })}
      </ListGroup>
    )
  }
}

export default Challenges;