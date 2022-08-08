const initialState = {
    seatList: []
}

const reducer = function (currentState = initialState, action) {
    switch (action.type) {
        case "UPDATE_SEAT_RESERVATION":
            currentState.seatList = action.payload;
            return {...currentState};
        default:
            return currentState;
    }
}

export default reducer;