import React, { Component } from 'react';
import axios from 'axios'
import EventAddForm from './EventAddForm';


class EventList extends Component {
    constructor () {
        super();
        this.state = {
            eventData: null,
            eventDataLoaded: false,
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

    handleMovieSubmit(e, title, description, date, time) {
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
    render () {
        console.log(this.state.eventData)
        return (
            <div>
                <EventAddForm handleMovieSubmit={this.handleMovieSubmit} />
                {this.renderEvents()}
            </div>
        )
    }
}

export default EventList;