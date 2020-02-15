import React, { Component } from 'react'

class Clock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timerMinute: 25,
            timerSecond: 0
        }
    }


    incrementBreak = () => {
        if (this.state.breakLength < parseInt(this.state.sessionLength / 2)) {
            this.setState(prevState => {
                return { breakLength: prevState.breakLength + 1 }
            });
        }

    }


    decrementBreak = () => {
        if (this.state.breakLength > 1) {
            this.setState(prevState => {
                return { breakLength: prevState.breakLength - 1 }
            });
        }
    }


    incrementSession = () => {
        if (this.state.sessionLength <= 59) {
            this.setState(prevState => {
                return { sessionLength: prevState.sessionLength + 1 }
            });
        }

    }


    decrementSession = () => {
        if (this.state.sessionLength > 2 * this.state.breakLength) {
            this.setState(prevState => {
                return { sessionLength: prevState.sessionLength - 1 }
            });
        }
    }

    timer = () => {
        if (this.state.timerMinute === 0) {
            this.setState(prevState => {
                return { timerMinute: 59 }
            })

        }
    }


    render() {
        const { breakLength, sessionLength, timerMinute, timerSecond } = this.state;
        return (
            <div className="container">
                <h1 className="text-center">Pomodoro Clock</h1>
                <div className="row">
                    <div className="col-md-6 text-right">
                        <p>Break Length</p>
                        <i onClick={this.incrementBreak} className="fa fa-arrow-up" aria-hidden="true"></i>
                        <span> {breakLength} </span>
                        <i onClick={this.decrementBreak} className="fa fa-arrow-down" aria-hidden="true"></i>
                    </div>
                    <div className="col-md-6 text-left">
                        <p>Session Length</p>
                        <i onClick={this.incrementSession} className="fa fa-arrow-up" aria-hidden="true"></i>
                        <span> {sessionLength} </span>
                        <i onClick={this.decrementSession} className="fa fa-arrow-down" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="text-center">
                    <p>Session</p>
                    <p>{timerMinute} : {timerSecond}</p>
                    <i class="fa fa-play-circle" aria-hidden="true"></i>
                    <i class="fa fa-pause-circle" aria-hidden="true"></i>
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                </div>

            </div>
        );
    }
}

export default Clock