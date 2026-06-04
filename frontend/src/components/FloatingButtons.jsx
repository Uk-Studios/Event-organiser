import {
  FaWhatsapp,
  FaPhoneAlt,
} from 'react-icons/fa'

import '../styles/FloatingButtons.css'

const FloatingButtons = () => {

  return (

    <div className="floating-buttons">

      <a
        href="https://wa.me/919597378170"
        target="_blank"
        rel="noreferrer"
        className="floating-btn whatsapp-btn"
      >

        <FaWhatsapp />

      </a>

      <a
        href="tel:+919597378170"
        className="floating-btn call-btn"
      >

        <FaPhoneAlt />

      </a>

    </div>
  )
}

export default FloatingButtons