import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Using Modal, Row, and Col from react-bootstrap
import { Modal, Row, Col } from "react-bootstrap";
import api from "../services/api";
import "../styles/AlbumDetails.css";

const AlbumDetailsScreen = () => {
  const { id } = useParams();

  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // NEW: State to track which image is currently open in the popup
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const { data } = await api.get(`/albums/${id}`);
        setAlbum(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  // NEW: Function to open modal (Only runs if screen is desktop width)
  const handleImageClick = (image) => {
    if (window.innerWidth > 768) {
      setSelectedImage(image);
    }
  };

  if (loading) {
    return <div className="album-loading">Loading...</div>;
  }

  if (!album) {
    return <div className="album-loading">Album Not Found</div>;
  }

  return (
    <div className="album-page">
      {/* --- ALL-IN-ONE HERO WRAPPER --- */}
      <section className="album-viewport-hero">
        <div className="hero-overlay"></div>

        <img
          src={album.coverImage}
          alt={album.title}
          className="hero-bg-image"
        />

        {/* --- FLOATING OVERLAY CONTENT AREA --- */}
        <div className="viewport-scroll-container">
          <div className="hero-text-content">
            <h1>{album.title}</h1>
            <p className="hero-desc">{album.description}</p>
          </div>

          <div className="album-intro-inline">
            <p>
              To look at a frame and remember not just what it looked like, but exactly how it felt to 
              stand there. We gather the light, the texture, and the unspoken emotion of your story.
            </p>
            <div className="intro-line-gold"></div>
          </div>

          {/* --- BOOTSTRAP GRID SYSTEM CONTAINER --- */}
          <div className="album-gallery-container">
            <Row className="g-4 justify-content-center">
              {album.images?.slice(1).map((image, index) => (
                <Col 
                  key={index} 
                  xs={12}   
                  md={4}   
                  lg={2} 

                  className="d-flex justify-content-center"
                >
                  {/* CHANGED: Added onClick handler here */}
                  <div 
                    className="gallery-item" 
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image}
                      alt={`Gallery content ${index + 1}`}
                      className="gallery-image"
                    />
                    <div className="gallery-overlay">
                      <span>View</span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

        </div>
      </section>

      <Modal
        show={Boolean(selectedImage)}
        onHide={() => setSelectedImage(null)}
        centered
        dialogClassName="custom-lightbox-modal"
        contentClassName="lightbox-content-wrapper"
      >
        {/* closeButton automatically builds the functional 'X' mark */}
        <Modal.Header closeButton closeVariant="white" className="lightbox-header-clean">
        </Modal.Header>
        <Modal.Body className="p-0 text-center lightbox-body-layout">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Expanded preview" 
              className="lightbox-preview-img"
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AlbumDetailsScreen;