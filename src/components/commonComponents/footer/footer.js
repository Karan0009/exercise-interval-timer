import React, { Component } from "react";
import "./footer.css";

import Button from "../Button/Button";

class Footer extends Component {
  state = {};
  render() {
    return (
      <>
        <nav className="footer_custom_styles">
          <a
            href="https://www.instagram.com/karansingh0810/"
            className="btn_social_media"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa fa-instagram" aria-hidden="true"></i>
          </a>
          <a
            href="https://twitter.com/Karansingh0308"
            className="btn_social_media"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
          </a>
        </nav>
      </>
    );
  }
}

export default Footer;
