import { Link } from "react-router-dom";

import "../styles/albumCard.css";

const AlbumCard = ({ album }) => {
  return (
    <Link to={`/albums/${album._id}`} className="album-card-link">
      <div className="album-card">
        <div className="album-stack">
          <div
            className="stack-card stack-left"
            style={{
              backgroundImage: `url(${album.images?.[1]})`,
            }}
          ></div>

          <div className="stack-card stack-right"
            style={{
              backgroundImage: `url(${album.images?.[2]})`,
            }}
          ></div>

          <div className="stack-main">
            <img src={album.coverImage} alt={album.title} />
          </div>
        </div>

        <div className="album-info">
          <p>{album.description?.slice(0, 80)}</p>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
