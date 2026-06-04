import { Spinner } from "react-bootstrap";

import { useEffect, useState } from "react";

import { getGalleryItems } from "../services/galleryService";

import "../styles/featuredAlbums.css";


const FeaturedAlbums = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getGalleryItems();

        setGalleryItems(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) {
    return (
      <div className="featured-loader">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="featured-section" id="portfolio">
      <div className="section-header">
        <span>Gallery</span>

        <h2>Where Moments Become Memories</h2>
      </div>

      <div className="featured-masonry">
        {galleryItems.length > 0
          ? galleryItems.map((item) => (
            <article className="portfolio-tile" key={item._id}>
              <img src={item.image} alt={item.description} />
              <div>
                <h3>{item.description}</h3>
              </div>
            </article>
          ))
          : <p className="no-albums"></p>}
      </div>
    </section>
  );
};

export default FeaturedAlbums;
