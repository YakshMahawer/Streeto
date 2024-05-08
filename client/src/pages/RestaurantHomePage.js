import React from "react";
import DownBar from "../components/downBar";
import { Link } from "react-router-dom";

const RestaurantHomePage = () => {
    return(
        <div className="restaurant_home_page">
            RestaurantHomePage
            <Link to="/place">
                    Go To This
            </Link>
            <DownBar />
        </div>
    )
}

export default RestaurantHomePage;