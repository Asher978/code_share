import React from 'react';

const Users = (props) => {
  return (
    <div className="users">
    <h3>Online Users (this.props.online)</h3>
      <ul>
        {props.users.map((user, i) => {
          return <li key={i}>{user}</li>
        })}
      </ul>
    </div>
  )
}

export default Users;