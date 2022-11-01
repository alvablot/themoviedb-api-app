import React from "react";
import { Outlet, NavLink, Link, useLoaderData, Form, redirect } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <nav className="crumbs">
                <ol>
                    <li className="crumb">
                    <NavLink
                            to={`/topmovies`}
                            className={({ isActive, isPending }) =>
                                isActive ? "active" : isPending ? "pending" : ""
                            }
                        >
                            Top Movies
                        </NavLink>
                    </li>
                </ol>
            </nav>
        </div>
    );
}

export default Navbar;
