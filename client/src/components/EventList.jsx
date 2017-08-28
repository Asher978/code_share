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
            zipValidation: '',
        }
        this.handleEventLookUp = this.handleEventLookUp.bind(this);
    }

    componentDidMount() {
        axios.get('/events')
        .then(res => {
            console.log(res.data.data)
            this.setState({
                eventData: res.data.data,
                eventDataLoaded: true,
            });
            }).catch(err => console.log(err));
    }

    handleEventSubmit = (e, title, description, date, time, id) => {
        e.preventDefault();
        axios.post('/events', {
            title,
            description,
            date,
            time,
            id: this.props.id,
        }).then(res => {
            this.setState({
                eventData: res.data.data,
            })
        }).catch(err => console.log(err));
    }

    // ZIP Code Validation and Getting data back from google and Meetup
    handleEventLookUp(e, ZIP) {
        e.preventDefault();        
        let validZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(ZIP);
        if (validZip) {
            axios.post('/meetup', {
                ZIP: ZIP,
            }).then(res => {
                if (res.data.data.length === 0) {
                    this.setState({eventListLoaded: false, zipValidation: 'INVALID ZIP'})
                } else {
                    this.setState({
                        eventList: res.data.data,
                        eventListLoaded: true,
                    })
                } 
            }).catch(err => console.log(err));
        } else {
            this.setState({ zipValidation: 'ZIP MUST BE 5 NUMBERS' })
        }
    }

    renderEvents () {
        if(this.state.eventDataLoaded) {
            return <div>
                {this.state.eventData.map(((event, index) => {
                    return (
                        <main key={index}>
                            <h1>Title: {event.title} <small>Created By: {event.firstname}</small></h1>
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
        } else {
            return (
                <div>
                    {this.state.zipValidation}
                </div>
            )
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