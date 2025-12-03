import {useState,useEffect} from "react";
import axios from "axios";

export default function Image() {
    const [data,setData] = useState([]);
    useEffect( ()=>{
        const fetchImages = async () => {  
        try{
        const response = await axios.get("http://localhost:5000/images");

        console.log(response.data);
        setData(response.data);
        }
        catch(error) {
            console.log(error);
        }
       };
       fetchImages();
    },[]);
    return (
        <>
           {
            data.map((img,index)=> (
                <div key={index}>
                    <p>{img.filename}</p>
                    <img
                        src={img.filepath}
                        alt={img.filename}
                        style={{width:"150px",height:"150px"}}
                    />
                </div>
            ))
           }
        </>
    );
}