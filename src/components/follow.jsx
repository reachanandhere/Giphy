import React from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Follow = () => {
  return (
    <div className="faded-text pt-2">
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3">

      <a href="https://www.linkedin.com/in/anandverma08/">
          <FaLinkedin size={25} />
        </a>
        <a href="https://www.instagram.com/reachanand_">
          <FaInstagram size={25} />
        </a>

        <a href="https://x.com/son_Of_Verma">
          <FaTwitter size={25} />
        </a>

      
      </div>
    </div>
  );
};

export default Follow;
