import { Button, Container } from "react-bootstrap";

import { Link } from "react-router-dom";

import FeaturedAlbums from "../components/FeaturedAlbums";

import "../styles/homeScreen.css";

import CategoryAlbumsScreen from "../screens/CategoryAlbumsScreen";

const services = [
  {
    title: "Weddings & Receptions",
    text: "A timeless collection of love, laughter, and beautifully unfolding moments.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    link: "/albums/category/wedding-events",
  },
  {
    title: "Milestone Celebrations",
    text: "Stories of life's most meaningful milestones with warmth, joy, and elegance.",
    image:
      "https://www.xorooms.com/images/luxury/luxury-pkg6a.jpg",
    link: "/albums/category/the-little-chapters",
  },
  {
    title: "House & Villa Events",
    text: "A celebration of family, tradition, and the beauty of togetherness.",
    image:
      "https://www.aahadecorevents.com/events/housewarming-event-planners-in-chennai.jpg",
    link: "/albums/category/family-events",
  },
  {
    title: "Corporate Events",
    text: "Documenting the moments that define teams, brands, and meaningful connections.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200",
    link: "/albums/category/corporate-events",
  },
];

const HomeScreen = () => {
  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <Container className="hero-content">
          <div className="hero-kicker">Luxury Event Photography</div>

          <h1 className="hero-title">
            The Art of Creativity
            <span> Beyond Expectation</span>
          </h1>

          <p className="hero-description">
            Dedicated to the art of celebration, we design refined weddings,
            destination events, private occasions, and brand experiences
            distinguished by elegance.
          </p>

          <div className="hero-buttons">
            <a href="/#services">
              <Button className="primary-btn">Explore Albums</Button>
            </a>

            <Link to="/contact">
              <Button className="secondary-btn">Contact Us</Button>
            </Link>
          </div>
        </Container>
      </section>

      <section className="story-section ">
        <Container>
          <div className="story-grid">
            <div className="story-copy">
              <span className="section-kicker">Our Story</span>
              <h2>For the moments that deserve more than memory.</h2>
              <p>
                Every wedding and celebration carries its own rhythm,
                atmosphere, and meaning.
              </p>
              <p>
                Through thoughtful storytelling and timeless imagery, we capture
                the moments that become part of your family's story for
                generations to come
              </p>
            </div>

            <div className="story-images">
              <img
                src="https://img.magnific.com/free-photo/professional-equipment-camera-tripod-stand-field-front-prepared-table-evening-time_146671-14420.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Luxury candlelit event dinner"
                className="story-image-main"
              />
              <img
                src="https://images.shiksha.com/mediadata/images/articles/1568193656phpmWI2xq.jpeg"
                alt="Elegant floral event table"
                className="story-image-accent"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="services-section " id="services">
        <Container>
          <div className="editorial-heading">
            <span className="section-kicker">Our Services</span>
            <h2>Celebrations Through Our Lens</h2>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <Link
                to={service.link}
                className="service-link"
                key={service.title}
              >
                <article className="service-card">
                  <img src={service.image} alt={`${service.title} service`} />
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FeaturedAlbums />
    </>
  );
};

export default HomeScreen;
