import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import GuestHeader from "./Guest/Header";
import UserHeader from "./User/Header"

function Header() {
    return (
        <Fragment>
            {JSON.parse(localStorage.getItem("token")) === null ? (
                <GuestHeader />
            ) : (
                <UserHeader />
            )}
        </Fragment>
    );
}

export default withRouter(Header);