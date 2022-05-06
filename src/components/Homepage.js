import React from "react";
import { Link } from "react-router-dom";

import BottomContainer from "../containers/BottomContainer";
import birthdayImage from "../img/adi-goldstein-Hli3R6LKibo-unsplash.jpg";
import farewellImage from "../img/farewell.jpg";
import EDMImage from "../img/pexels-wendy-wei-1805895.jpg";
import bannerImage from "../img/qrcode.png";
import qrScan from "../img/qrScan.png";
import timeSaving from "../img/timeSaving.png";
import quickAcess from "../img/quickAccess.png";

function Homepage() {
  return (
    <>
      <header className="navbar navbar-light bg-dark">
        <Link to="/" className="navbar__title">
          Digital Validator
        </Link> 
      </header>
      <div className="row m-0">
        <div
          id="indicator"
          className="carousel slide p-0"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#indicator"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#indicator"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#indicator"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item">
              <img
                src={EDMImage}
                className="d-block w-100"
                alt="edmImage"
                height="500px"
              />
              <div className="carousel-caption d-none d-md-block text-light">
                <h4> EDM Nights </h4>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src={birthdayImage}
                className = "d-block w-100 "
                alt="birthImage"
                height="500px"
              />
              <div className="carousel-caption d-none d-md-block text-light">
                <h4>Birthday Party</h4>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={farewellImage}
                className = "d-block w-100"
                alt="farewellImage"
                height="500px"
              />
              <div className="carousel-caption d-none d-md-block text-light">
                <h4>Farewell Party</h4>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#indicator"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#indicator"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>     
      <div className="container">
        <div className="row">
          <div className="col m-0 my-5 bg-white">
            <h1>Digital validator</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              repellat possimus ab dicta nobis eum cupiditate? Obcaecati
              deleniti consequatur quod eligendi saepe aliquam fugit totam neque
              quaerat eaque, esse quos.
            </p>
          </div>
          <div className="col m-0 my-5 p-0 bg-white">
            <img src={bannerImage} alt="entry validator" height="300px" />
          </div>
        </div>
        <div className="row m-0 mb-5">
          <div className="col bg-white">
            <div className="card">
              <img
                src={timeSaving}
                className="card-img-top"
                alt="time saving"
                height="300px"
              />
              <div className="card-body">
                <h5 className="card-title">less time consuming for users</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
          <div className="col bg-white">
            <div className="card">
              <img
                src={qrScan}
                className="card-img-top"
                alt="qr scan"
                height="300px"
              />
              <div className="card-body">
                <h5 className="card-title">validation using qr code</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
          <div className="col bg-white">
            <div className="card">
              <img
                src={quickAcess}
                className="card-img-top"
                alt="quick access"
                height="300px"
              />
              <div className="card-body">
                <h5 className="card-title">Provide Quick Access</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomContainer />
    </>
  );
}

export default Homepage;
