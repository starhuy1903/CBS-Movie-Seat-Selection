import React, {Component} from 'react';
import {connect} from "react-redux";

class Cinema extends Component {

    state = {
        isBooking: false,
        isEnough: false
    }

    user = {
        name: "",
        numOfSeats: 0,
        seats: [],
    }

    reservedSeat = (id) => {
        getComputedStyle(document.getElementById(id), ':before')
    }

    handleChange = (e) => {
        this.user[`${e.target.name}`] = e.target.value;
    }

    handleChooseSeat = (seatNum) => {
        let seatList = this.user.seats;
        const index = seatList.findIndex(item => item === seatNum);
        if (index === -1) {
            seatList.push(seatNum)
        } else {
            seatList.splice(index, 1)
        }
        if (seatList.length == this.user.numOfSeats) {
            this.setState({
                isEnough: true
            })
        } else {
            this.setState({
                isEnough: false
            })
        }
        this.user.seats = seatList;
    }

    takeData = () => {
        if (this.user.name.length === 0 || this.user.numOfSeats == 0) {
            alert("Please Enter your Name and Number of Seats");
        } else {
            this.setState({
                isBooking: true,
            })
        }
    }

    confirmBooking = () => {
        const {name, numOfSeats, seats} = this.user;
        if(this.state.isEnough) {

            let allName = [];
            let allNumber = [];
            let allSeat = [];

            allName.push(name);
            allNumber.push(numOfSeats);
            allSeat.push(seats);

            document.getElementById("nameDisplay").value = allName;
            document.getElementById("NumberDisplay").value = allNumber;
            document.getElementById("seatsDisplay").value = allSeat;

            const cloneSeatList = this.props.seatList;
            seats.forEach(bookingSeat => {
                    cloneSeatList.forEach(row => {
                            row.danhSachGhe.map(seat => {
                                if (seat.soGhe === bookingSeat) {
                                    seat.daDat = true;
                                }
                                return seat;
                            })
                        }
                    )
                }
            )

            this.props.dispatch({type: "UPDATE_SEAT_RESERVATION", payload: cloneSeatList})

            this.setState({
                isBooking: false,
                isEnough: false
            })
        } else {
            alert(`Please select ${numOfSeats} seats`)
        }

    }

    renderSeat = (seatRow) => {
        if (seatRow.hang === "") {
            return seatRow.danhSachGhe.map((item, i) => {
                return (
                    i !== 5 ? <td>{item.soGhe}</td> : <>
                        <td>{item.soGhe}</td>
                        <td></td>
                    </>
                )
            })
        } else {
            return seatRow.danhSachGhe.map((item, i) => {
                return ( i !== 5 ?
                    <td>
                        <input
                            id={item.soGhe}
                            disabled={item.daDat || !this.state.isBooking || this.state.isEnough && !this.user.seats.includes(item.soGhe)}
                            onClick={() => this.handleChooseSeat(item.soGhe)}
                            type="checkbox"
                            className="seats"
                            value={item.soGhe}/>
                    </td> :
                    <>
                        <td>
                            <input
                                id={item.soGhe}
                                disabled={item.daDat || !this.state.isBooking || this.state.isEnough && !this.user.seats.includes(item.soGhe)}
                                onClick={() => this.handleChooseSeat(item.soGhe)}
                                type="checkbox"
                                className="seats"
                                value={item.soGhe}/>
                        </td>
                        <td></td>
                    </>
                )
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="w3ls-reg">
                    {/*input form*/}
                    <div className="inputForm">
                        <h2>fill the required details below and select your seats</h2>
                        <div className="mr_agilemain">
                            <div className="agileits-left">
                                <label>
                                    Name
                                    <span>*</span>
                                </label>
                                <input disabled={this.state.isBooking} onChange={this.handleChange} type="text"
                                       name="name" required/>
                            </div>
                            <div className="agileits-right">
                                <label>
                                    Number of Seats
                                    <span>*</span>
                                </label>
                                <input disabled={this.state.isBooking} onChange={this.handleChange} type="number"
                                       name="numOfSeats" required min="1"/>
                            </div>
                        </div>
                        <button onClick={this.takeData}>Start Selecting</button>
                    </div>

                    <ul className="seat_w3ls">
                        <li className="smallBox greenBox">Selected Seat</li>

                        <li className="smallBox redBox">Reserved Seat</li>

                        <li className="smallBox emptyBox">Empty Seat</li>
                    </ul>

                    {/*seat availabilty list*/}
                    {/*seat layout*/}
                    <div className="seatStructure txt-center">
                        {this.state.isBooking ?
                            <p><b style={{marginBottom: "0px", background: "#ff9800", letterSpacing: "1px"}}>Please
                                Select your Seats NOW!</b></p> : null}
                        <table id="seatsBlock">
                            {this.props.seatList.map((seatRow) => {
                                return (
                                    <tr>
                                        <td>{seatRow.hang}</td>
                                        {this.renderSeat(seatRow)}
                                    </tr>
                                )
                            })
                            }
                        </table>

                        <div className="screen">
                            <h2 className="wthree">Screen this way</h2>
                        </div>
                        <button onClick={this.confirmBooking}>Confirm Selection</button>
                    </div>

                    {/*seat layout */}
                    {/*details after booking displayed here */}
                    <div className="displayerBoxes txt-center" style={{overflowX: "auto"}}>
                        <table className="Displaytable w3ls-table" width="100%">
                            <tr>
                                <th>Name</th>
                                <th>Number of Seats</th>
                                <th>Seats</th>
                            </tr>
                            <tr>
                                <td>
                                    <textarea id="nameDisplay"></textarea>
                                </td>
                                <td>
                                    <textarea id="NumberDisplay"></textarea>
                                </td>
                                <td>
                                    <textarea id="seatsDisplay"></textarea>
                                </td>
                            </tr>
                        </table>
                    </div>
                    {/*details after booking displayed here*/}
                </div>
            </div>


        );
    }
}


const mapStateToProps = (state) => {
    // console.log(state.seat.seatList)
    return {
        seatList: state.seat.seatList
    }
}

export default connect(mapStateToProps)(Cinema);