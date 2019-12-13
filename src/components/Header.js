import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import GuestHeader from "./Guest/Header";
import UserHeader from "./User/Header"
import AdminHeader from "./Admin/Header";
import { verify  } from '../components/helpers'

function Header() {
  return (
    <Fragment>
      {JSON.parse(localStorage.getItem("token")) === null ? (
        <GuestHeader />
      ) : (
        (verify().role === "users" ? <UserHeader /> : <AdminHeader />)
      )}
    </Fragment>
  );
}

export default withRouter(Header);
