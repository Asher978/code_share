import React, { Component } from 'react';
import challenge from '../challenge/challenge';
import { Link } from 'react-router-dom';

class Challenges extends Component {
  render () {
    return (
    <div>
     {challenge.map(c => {
       return (
         <div id={c.id}>
            <Link to={`/challenges/${c.id}`}>Challenge # {c.id}</Link>
            <p>{c.chall}</p>
         </div>
       )
     })}
    </div>
    )
  }
  
}

export default Challenges;