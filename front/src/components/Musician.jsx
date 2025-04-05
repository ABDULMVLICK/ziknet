import React from "react";


const Musician = ({ name, profession, musicType }) => {
  return (
    <div className="flex items-center justify-between bg-stone-200 rounded-lg p-4 mb-4" style={{ backgroundColor: "#E0D8CC", borderRadius: "33px" }}>
     
      <div className="flex items-center">
        <div className="text-3xl mr-3">
          👤
        </div>
        <div>
          <h3 className="font-serif text-xl">{name}</h3>
          <p className="text-gray-600 font-serif">{profession}</p>
        </div>
      </div>

      
      <div className="flex items-center">
        <p className="font-serif text-xl text-gray-500 mr-3">{musicType}</p>
        <div className="text-3xl">
          💬
        </div>
      </div>
    </div>
  );
  
};
export default Musician;