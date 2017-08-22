import React, { Component } from 'react';
import axios from 'axios'
import EventAddForm from './EventAddForm';
import EventLookUp from './EventLookUp';
import ApiEventList from './ApiEventList';

class EventList extends Component {
    constructor () {
        super();
        this.state = {
            eventData: null,
            eventDataLoaded: false,
            eventList: null,
            eventListLoaded: false,
        }
        this.handleEventLookUp = this.handleEventLookUp.bind(this);
    }

    componentDidMount() {
        axios.get('/events')
        .then(res => {
            this.setState({
                eventData: res.data.data,
                eventDataLoaded: true,
            });
            }).catch(err => console.log(err));
    }

    handleEventSubmit(e, title, description, date, time) {
        e.preventDefault();
        axios.post('/events', {
            title,
            description,
            date,
            time,
        }).then(res => {
            this.setState({
                eventData: res.data.data,
            })
        }).catch(err => console.log(err));
    }

    handleEventLookUp(e, ZIP) {
        e.preventDefault();
        axios.post('/meetup', {
            ZIP: ZIP,
        }).then(res => {
            this.setState({
            eventList: res.data.data,
            eventListLoaded: true,
            })
        }).catch(err => console.log(err));
    }

    renderEvents () {
        if(this.state.eventDataLoaded) {
            return <div>
                {this.state.eventData.map((event => {
                    return (
                        <main key={event.id}>
                            <h1>Title: {event.title}</h1>
                            <p>{event.description}</p>
                            <p>{new Date(event.date).toString().split(" ").splice(0,4).join(" ")}</p>
                            <p>{event.time}</p>
                        </main>
                    )
                }))}
            </div>
        }
    }
    
    renderApiEventList () {
        if(this.state.eventListLoaded) {
            return <ApiEventList event={this.state.eventList} />
        }
    }
    render () {
        return (
            <div>
                <EventAddForm handleEventSubmit={this.handleEventSubmit} />
                <EventLookUp handleEventLookUp={this.handleEventLookUp} />
                {this.renderEvents()}
                {this.renderApiEventList()}
            </div>
        )
    }
}

export default EventList;