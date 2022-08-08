import React, {Component} from 'react';
import Cinema from "./Cinema";
import './Home.css'
import {connect} from "react-redux";
import seatList from '../data/danhSachGhe.json'
import Footer from "./Footer";

class Home extends Component {

    componentDidMount() {
        // console.log(seatList)
        const action = {
            type: "UPDATE_SEAT_RESERVATION",
            payload: seatList
        }
        this.props.dispatch(action);
    }

    render() {
        return (
            <div>
                <h1 className="text">Movie Seat Selection</h1>
                <Cinema/>
                <Footer/>
            </div>
        );
    }
}

export default connect()(Home);