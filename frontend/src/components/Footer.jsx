import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="luxury-footer">
      <div>
        <h2>UK Studios & Eventers</h2>
        <p>
          Luxury event management for weddings, private celebrations,
            gatherings and refined brand occasions.
        </p>
      </div>

      <nav>
        <Link to="/">Home</Link>
        <a href="/#services">Services</a>
        <Link to="/contact">Contact</Link>
      </nav>

      <small>
        UK Studios & Eventers &copy; 2026
      </small>
    </footer>
  )
}

export default Footer
