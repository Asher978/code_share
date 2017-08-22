import React, { Component } from 'react';


class EventLookUp extends Component {
    constructor() {
        super();
        this.state = {
            ZIP: '',
        }
    }

    handleEventLookUpChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        this.setState({
            [name]: value,
        })
    }
    
    render () {
        return (
            <form onSubmit={(e) => this.props.handleEventLookUp(e, this.state.ZIP)}>
            <label> Zip Code
                <input type="text" name="ZIP" placeholder="ZIP CODE" value={this.state.ZIP} onChange={this.handleEventLookUpChange} />
            </label>
            <input type="submit" value="LookUp Event" />
            </form>
        )
    }
}

export default EventLookUp;