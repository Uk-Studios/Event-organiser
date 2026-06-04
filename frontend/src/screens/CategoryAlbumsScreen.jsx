import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { getAlbums } from "../services/albumService";
import AlbumCard from "../components/AlbumCard";
import "../styles/CategoryAlbumsScreen.css";

const CategoryAlbumsScreen = () => {
  const { category } = useParams();

  const [albums, setAlbums] = useState([]);

  const categoryMap = {
  "wedding-events": [
    "Wedding",
    "Reception",
  ],
  "the-little-chapters": [
    "Birthday Party",
    "Baby Shower",
    "Age Attending Ceremony",
  ],
  "family-events": [
    "House Warming",
  ],
  "corporate-events": [
    "Corporate Meeting",
  ],
};

const headingMap = {
  "wedding-events": "Weddings & Receptions",
  "the-little-chapters": "The Little Chapters",
  "family-events": "Memorable Occasions",
  "corporate-events": "Meetings & Corporate Events",
};


useEffect(() => {
  const fetchAlbums = async () => {
    const data = await getAlbums();

    const categories =
      categoryMap[category] || [];

    const filtered = data.filter((album) =>
      categories.includes(album.category)
    );

    setAlbums(filtered);
  };

  fetchAlbums();
}, [category]);

  return (
   <div className="category-page">
  <Container>

    <div className="category-header">

      <div className="category-left">
        <h1>
  {headingMap[category] || "Collections"}
</h1>
      </div>


    </div>

    <div className="category-divider"></div>

    <Row className="g-4">
      {albums.map((album) => (
        <Col key={album._id} lg={4} md={6} sm={6} xs={12}>
          <AlbumCard album={album} />
        </Col>
      ))}
    </Row>

  </Container>
</div>
  );
};

export default CategoryAlbumsScreen;