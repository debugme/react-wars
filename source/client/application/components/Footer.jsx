import React from 'react'

const Footer = () =>
  <footer className="footer">

    <a className="footer-link" href="mailto:debugme@hotmail.com">
      <i className="footer-link-icon" data-title="E-Mail" data-icon="&#xf1d8;"></i>
    </a>
    <a className="footer-link" href="https://uk.linkedin.com/in/debugme" target="_blank">
      <i className="footer-link-icon" data-title="LinkedIn" data-icon="&#xf30c;"></i>
    </a>
    <a className="footer-link" href="https://github.com/debugme" target="_blank">
      <i className="footer-link-icon" data-title="GitHub" data-icon="&#xf09b;"></i>
    </a>
    <a className="footer-link" href="https://debugme.wordpress.com/" target="_blank">
      <i className="footer-link-icon" data-title="WordPress" data-icon="&#xf19a;"></i>
    </a>

    <span className="footer-view">
      <i className="footer-view-icon"
        data-title-micro="Phone" data-icon-micro="&#xF10B;"
        data-title-small="Tablet" data-icon-small="&#xF10A;"
        data-title-medium="Laptop" data-icon-medium="&#xF109;"
        data-title-large="Desktop" data-icon-large="&#xF108;">
      </i>
    </span>

  </footer>

export default Footer

