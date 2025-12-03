import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/getAllItems.css";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";


export default function GetAllItem() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortStatus, setSortStatus] = useState("all");
  const [profile_photo, setProfile_photo] = useState({ profile_photo: localStorage.getItem('profile_photo') });
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/item/get-all-items", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.items);
    }
    fetchData();
  }, []);

  const filterData = data.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      sortStatus === "all" || (item.type && item.type.toUpperCase() === sortStatus);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="gaa-page-container">
      {/* Header: profile photo */}
      {/* Controls: search bar + dropdown */}
      <div className="gaa-controls">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="gaa-search-bar"
        />
        <select
          value={sortStatus}
          onChange={(e) => setSortStatus(e.target.value)}
          className="gaa-sort-dropdown"
        >
          <option value="all">All</option>
          <option value="LOST">Lost</option>
          <option value="FOUND">Found</option>
        </select>
            <div className="gaa-header">
           <img 
  src={profile_photo.profile_photo} 
  alt="profile_photo" 
  style={{
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    cursor: "pointer", // indicates it’s clickable
    margin: "0px 50px"
  }}
  onClick={() => navigate("/post-item")}
/>

      </div>

      </div>

      {/* Items */}
      <div className="gaa-items-container">
        {filterData.length > 0 ? (
          filterData.map((item, index) => (
            <div key={index} className="gaa-item-card">
              <div className="gaa-img-div">
                <img src={item.item_photo} alt="item_photo" className="gaa-item-image" />
              </div>
              <div className="gaa-container">
                <p className="gaa-item-title">{item.title}</p>
                <p className="gaa-item-type">{item.type}</p>
                <p className="gaa-item-category">{item.category}</p>
                <p className="gaa-item-description">{item.description}</p>
                <p className="gaa-item-location"><FaMapMarkerAlt className="gaa-icon"/> {item.location}</p>
                <p className="gaa-item-contact"><FaPhone className="gaa-icon"/> {item.contact_number}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="gaa-no-results">No items found</p>
        )}
      </div>
    </div>
  );
}
