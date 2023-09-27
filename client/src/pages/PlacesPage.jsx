import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";

export const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtrainfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className=" text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(description) {
    return <p className=" text-gray-500 text-sm">{description}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });

    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...addedPhotos, ...filenames];
        });
      });
  }

  return (
    <div>
      {action !== "new" && (
        <div className=" text-center py-6">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form>
            {preInput(
              "Title",
              "Title for you place should be short and catchy"
            )}
            <input
              onChange={(ev) => {
                setTitle(ev.target.value);
              }}
              value={title}
              type="text"
              placeholder="title, for example my lovely apartment"
            ></input>

            {preInput("Address", "Address to this place")}
            <input
              onChange={(ev) => {
                setAddress(ev.target.value);
              }}
              value={address}
              type="text"
              placeholder="address"
            ></input>

            {preInput("Photos", "More = better")}
            <div className=" flex gap-2">
              <input
                value={photoLink}
                onChange={(ev) => {
                  setPhotoLink(ev.target.value);
                }}
                type="text"
                placeholder=" Add using link ...jpg"
              ></input>
              <button
                onClick={addPhotoByLink}
                className=" bg-gray-200 px-4 rounded-2xl text-sm"
              >
                Add&nbsp; photo
              </button>
            </div>
            <div className=" mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div>
                    <img
                      className=" rounded-2xl"
                      src={"http://localhost:4000/uploads/" + link}
                    />
                  </div>
                ))}
              <label className="flex cursor-pointer justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-500">
                <input
                  type="file"
                  multiple
                  className=" hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
            </div>

            {preInput("Description", "Description of your place")}
            <textarea
              value={description}
              onChange={(ev) => {
                setDescription(ev.target.value);
              }}
            />

            {preInput("Perks", "perks of your place")}

            <Perks selected={perks} onChange={setPerks} />

            {preInput("Extra Info", "house rules, etc")}
            <textarea
              value={extraInfo}
              onChange={(ev) => {
                setExtrainfo(ev.target.value);
              }}
            />

            {preInput(
              "Check in & Out times",
              "add check in and out times & max guests"
            )}

            <div className=" grid sm:grid-cols-3 gap-2">
              <div>
                <h3>Check in time</h3>
                <input
                  value={checkIn}
                  onChange={(ev) => {
                    setCheckIn(ev.target.value);
                  }}
                  type="text"
                  placeholder="14:00"
                />
              </div>
              <div>
                <h3>Check out time</h3>
                <input
                  value={checkOut}
                  onChange={(ev) => {
                    setCheckOut(ev.target.value);
                  }}
                  type="text"
                  placeholder="17:00"
                />
              </div>
              <div>
                <h3>Max Guests</h3>
                <input
                  value={maxGuests}
                  onChange={(ev) => {
                    setMaxGuests(ev.target.value);
                  }}
                  type="number"
                  placeholder="10"
                />
              </div>
            </div>
            <button className=" primary my-5">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};
