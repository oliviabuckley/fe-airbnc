// import { useState, useEffect } from "react";
// import { UserContext } from "../contexts/UserContext";

// export default function MyFavourites() {
//   const [myFavourites, setMyFavourites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     fetch(`https://be-airbnc.onrender.com/api/properties`)
//       .then((res) => res.json())
//       .then((data) => {
//         setProperties(data.properties);
//         setLoading(false);
//       });
//   }, []);
// }
