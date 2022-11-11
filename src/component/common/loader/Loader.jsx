import React, { useState } from "react";
import LoadingOverlay from 'react-loading-overlay';
function Loading(){
  const [loading,setLoading]=useState(false);
  const handleClick=()=>{
    setLoading(!loading)
  }
return (
  <div>
    <button onClick={handleClick}>Loading</button>
      <LoadingOverlay active={loading} spinner  text='Loading...'>

</LoadingOverlay>
  </div>
);
}
export default Loading;

