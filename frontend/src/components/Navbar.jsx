import React from "react";
import { Outlet, NavLink, Link, useLoaderData, Form, redirect } from "react-router-dom";

function Navbar() {
    return (
        <div>
            {/* <NavLink
                            to={`/topmovies`}
                            className={({ isActive, isPending }) =>
                                isActive ? "active" : isPending ? "pending" : ""
                            }
                        >
                            Top Movies
                        </NavLink> */}
            <a href="/topmovies">Start</a><br />
  
        </div>
    );
}

export default Navbar;
