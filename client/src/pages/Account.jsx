import React, { useContext, useState } from "react";
import { UserContext } from "../UserContextProvider";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const Account = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();

  const handleLogout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  if (!ready) {
    return <div>Loading..</div>;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(type) {
    let classes = "py-2 px-6";

    if (subpage === undefined) {
      subpage = "profile";
    }

    if (type == subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }

  return (
    <div>
      <div className=" w-full flex mt-8 justify-center gap-4">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accommodations
        </Link>
      </div>
      {subpage === "profile" && (
        <div className=" text-center max-w-sm mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={handleLogout} className=" primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
