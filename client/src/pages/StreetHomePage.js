import React from "react";
import { Link } from "react-router-dom";
import DownBar from "../components/downBar";

const StreetHomePage = () => {
    return(
        <div className="street_home_page">
            StreetHomePage
            <Link to="/place">
                    Go To This
            </Link>
            <DownBar />
        </div>
    )
}

export default StreetHomePage;