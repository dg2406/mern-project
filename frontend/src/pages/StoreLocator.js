import React from "react";
import Layout from "../components/layout";
import "./StoreLocator.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const stores = [
  {
    id: 1,
    city: "Bangalore",
    address: "123 MG Road, Bangalore, Karnataka",
    phone: "+91 9876543210",
    time: "9:00 AM - 9:00 PM",
  },
  {
    id: 2,
    city: "Delhi",
    address: "45 Connaught Place, New Delhi",
    phone: "+91 9876543211",
    time: "10:00 AM - 10:00 PM",
  },
  {
    id: 3,
    city: "Mumbai",
    address: "22 Marine Drive, Mumbai, Maharashtra",
    phone: "+91 9876543212",
    time: "9:30 AM - 9:30 PM",
  },
];

const StoreLocator = () => {
  return (
    <Layout title={"Store Locator - Ecommerce App"}>
      <div className="store-page">
        <div className="store-header">
          <h1>Find Our Stores</h1>
          <p>
            Visit one of our stores near you and experience shopping in person.
          </p>
        </div>

        <div className="store-grid">
          {stores.map((store) => (
            <div className="store-card" key={store.id}>
              <h3>{store.city}</h3>

              <div className="store-info">
                <LocationOnIcon />
                <span>{store.address}</span>
              </div>

              <div className="store-info">
                <PhoneIcon />
                <span>{store.phone}</span>
              </div>

              <div className="store-info">
                <AccessTimeIcon />
                <span>{store.time}</span>
              </div>

              <button className="store-btn">
                Get Directions
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default StoreLocator;