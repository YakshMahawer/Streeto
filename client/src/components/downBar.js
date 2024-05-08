import React from "react";
import { Link } from 'react-router-dom';

const DownBar = () => {
    return(
        <div className="down_bar">
            <div className="down_buttons_div">
                <Link to="/">
                    Street Food
                </Link>
                <Link to="/restaurant">
                    Restaurant Food
                </Link>
                    {/* <button className="street_button">Street Food</button>
                    <button className="restaurant_button">Restaurant Food</button> */}
            </div>
        </div>
    )
}

export default DownBar;