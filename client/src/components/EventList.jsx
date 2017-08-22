import React, { Component } from 'react';
import axios from 'axios'
import EventAddForm from './EventAddForm';
import EventLookUp from './EventLookUp';

class EventList extends Component {
    constructor () {
        super();
        this.state = {
            eventData: null,
            eventDataLoaded: false,
            eventList: null,
            eventListLoaded: false,
        }
    }

    componentDidMount() {
        axios.get('/events')
            .then(res => {
                // console.log(res.data)
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
        // console.log(ZIP)
        axios.post('/meetup', {
            ZIP: ZIP,
        }).then(res => {
            console.log(res.data.data)
            this.setState({
                eventList: this.state.eventList,
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
    
    // TODO: uncomment this when the ApiEventList component is created
    // renderApiEventList () {
    //     if(this.state.eventListLoaded) {
    //         return <ApiEventList ApiEventList={this.state.EventList} />
    //     }
    // }
    render () {
        console.log(this.state.eventData)
        return (
            <div>
                <EventAddForm handleEventSubmit={this.handleEventSubmit} />
                <EventLookUp handleEventLookUp={this.handleEventLookUp} />
                {this.renderEvents()}
            </div>
        )
    }
}

export default EventList;