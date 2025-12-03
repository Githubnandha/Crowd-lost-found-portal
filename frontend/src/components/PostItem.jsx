import {useState} from "react";
import axios from "axios";
import "../css/postItem.css";

export default function PostItem() {
    const [data,setData] = useState({
        user_id: localStorage.getItem("user_id"),
        type: "",
        title: "",
        category: "",
        description: "",
        location: "",
    });
    const [item,setItem] = useState(null);
    const [message,setMessage] = useState("");
    const handleFileChange = (e) => {
        setItem(e.target.files[0]);
    }
    const handleChange = (e)=> {
       setData((prev) => ({
        ...prev,
        [e.target.name] : e.target.value
       }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        try {
            const formData = new FormData();
            formData.append("item_photo",item);
            Object.keys(data).forEach((key)=>{
                formData.append(key,data[key]);
            });
            const token = localStorage.getItem("token");
            response = await axios.post("http://localhost:5000/item/post-item",formData,{
                headers: {
                    "Content-Type" : "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setMessage(response.data.message);
        }
        catch(error) {
            console.log(error.response.data.message);
        }
    }
    return(
        <>
    <div className="post-item-container">
  <div className="post-item-wrapper">
    <div className="post-item-card">
      <div className="post-item-header">
        <h1 className="post-item-title">Post Item</h1>
        <p className="post-item-subtitle">
          Help others find their lost items or report found items
        </p>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off" className="post-item-form">
        <div className="form-group">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            name="item"
            onChange={handleFileChange}
            accept="image/*"
            className="file-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Select Type</label>
          <div className="radio-group">
            <label className="radio-item">
              <input
                type="radio"
                name="type"
                value="Lost"
                checked={data.type === "Lost"}
                onChange={handleChange}
                className="radio-input"
              />
              <span className="radio-label lost">Lost</span>
            </label>
            <label className="radio-item">
              <input
                type="radio"
                name="type"
                value="Found"
                checked={data.type === "Found"}
                onChange={handleChange}
                className="radio-input"
              />
              <span className="radio-label found">Found</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Item Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="text-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={data.category}
            onChange={handleChange}
            className="select-input"
          >
            <option value="">---choose one---</option>
            <option value="Electronics">Electronics</option>
            <option value="Documents">Documents</option>
            <option value="Clothings & Accessories">Clothings & Accessories</option>
            <option value="Keys">Keys</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            rows={4}
            className="textarea-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={data.location}
            onChange={handleChange}
            className="text-input"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>

        {message && (
          <div className="success-message">
            <p className="success-text">{message}</p>
          </div>
        )}
      </form>
    </div>
  </div>
</div>

        </>
    );
}