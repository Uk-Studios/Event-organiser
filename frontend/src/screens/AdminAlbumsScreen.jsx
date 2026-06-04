import { useEffect, useState } from "react";

import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
} from "react-bootstrap";

import { toast } from "react-toastify";

import {
  createAlbum,
  deleteAlbum,
  getAlbums,
  updateAlbum,
} from "../services/albumService";

import api from "../services/api";

import "../styles/AdminAlbums.css";

const categories = [
  "Wedding",
  "House Warming",
  "Baby Shower",
  "Birthday Party",
  "Age Attending Ceremony",
  "Reception",
  "Corporate Meeting",
];

const AdminAlbumsScreen = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(Array(6).fill(""));
  const [uploadingIndex, setUploadingIndex] = useState(null);

  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setImages(Array(6).fill(""));
    setEditingAlbum(null);
  };

  const fetchAlbums = async () => {
    try {
      const data = await getAlbums();
      setAlbums(data);
    } catch (error) {
      toast.error("Failed to load albums");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const uploadHandler = async (event, index) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("images", file);

    try {
      setUploadingIndex(index);

      const { data } = await api.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const nextImages = [...images];
      nextImages[index] = data.images[0];
      setImages(nextImages);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setUploadingIndex(null);
    }
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this album?")) {
      return;
    }

    try {
      await deleteAlbum(id, adminInfo.token);
      toast.success("Album deleted");
      fetchAlbums();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const createHandler = async (event) => {
    event.preventDefault();

    try {
      await createAlbum(
        {
          title,
          category,
          description,
          coverImage: images[0],
          images: images.filter(Boolean),
        },
        adminInfo.token,
      );

      toast.success("Album created");
      setShowModal(false);
      resetForm();
      fetchAlbums();
    } catch (error) {
      toast.error(error.response?.data?.message || "Create failed");
    }
  };

  const updateHandler = async (event) => {
    event.preventDefault();

    try {
      await updateAlbum(
        editingAlbum._id,
        {
          title,
          category,
          description,
          coverImage: images[0],
          images: images.filter(Boolean),
        },
        adminInfo.token,
      );

      toast.success("Album updated");
      setShowEditModal(false);
      resetForm();
      fetchAlbums();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const openEditModal = (album) => {
    setEditingAlbum(album);
    setTitle(album.title);
    setCategory(album.category);
    setDescription(album.description);

    const existingImages = Array(6).fill("");
    album.images?.forEach((img, index) => {
      existingImages[index] = img;
    });

    setImages(existingImages);
    setShowEditModal(true);
  };

  const renderAlbumForm = (submitHandler, submitText) => (
    <Form onSubmit={submitHandler} className="admin-form">
      <div className="album-form-intro">
        <div>
          <span>Album Details</span>
          <h3>{submitText}</h3>
          <p>
            Add polished collection details and upload a cover image plus supporting gallery frames.
          </p>
        </div>

        <strong>
          {images.filter(Boolean).length}/6 images
        </strong>
      </div>

      <Row className="album-form-grid">
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </Form.Group>

      <div className="image-upload-heading">
        <div>
          <span>Gallery Assets</span>
          <h4>Upload event photography</h4>
        </div>

        <p>Use the first slot as the public cover image.</p>
      </div>

      <div className="image-upload-grid">
        {images.map((image, index) => (
          <Form.Group className="image-upload-box" key={index}>
            <div className="image-upload-label">
              <Form.Label>
                {index === 0 ? "Cover Image" : `Image ${index + 1}`}
              </Form.Label>

              {image && <span>Ready</span>}
            </div>

            <Form.Control
              type="file"
              accept="image/*"
              onChange={(event) => uploadHandler(event, index)}
            />

            <div className="image-preview">
              {image ? (
                <img src={image} alt="" />
              ) : (
                <span>
                  {uploadingIndex === index ? "Uploading..." : "No image"}
                </span>
              )}
            </div>
          </Form.Group>
        ))}
      </div>

      <div className="album-form-actions">
        <Button type="submit" className="admin-primary-btn">
          {submitText}
        </Button>
      </div>
    </Form>
  );

  if (loading) {
    return <div className="admin-loading">Loading albums...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header admin-page-header-row">
        <div>
          <span>Portfolio Manager</span>
          <h1>Albums</h1>
          <p>Create, edit and curate the collections shown across the public gallery.</p>
        </div>

        <Button
          className="admin-primary-btn"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          Create Album
        </Button>
      </div>

      <Row className="g-4">
        {albums.map((album) => (
          <Col key={album._id} xs={12} md={6} xl={4}>
            <Card className="admin-album-card">
              <div className="admin-album-media">
                <Card.Img
                  variant="top"
                  src={album.coverImage}
                  alt={album.title}
                />

                <div className="admin-album-overlay">
                  <span>{album.category}</span>
                  <strong>{album.images?.length || 0} Photos</strong>
                </div>
              </div>

              <Card.Body>
                <div className="admin-album-meta">
                  <span>{album.category}</span>
                  <strong>Published</strong>
                </div>

                <h5>{album.title}</h5>
                <p>{album.description?.slice(0, 96)}</p>

                <div className="admin-card-actions">
                  <Button
                    className="admin-soft-btn"
                    size="sm"
                    onClick={() => openEditModal(album)}
                  >
                    Edit
                  </Button>

                  <Button
                    className="admin-danger-btn"
                    size="sm"
                    onClick={() => deleteHandler(album._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        className="admin-modal"
      >
        <Modal.Header closeButton className="album-modal-header">
          <div>
            <span>Portfolio Manager</span>
            <Modal.Title>Create Album</Modal.Title>
            <p>Build a new public-facing event collection.</p>
          </div>
        </Modal.Header>

        <Modal.Body>
          {renderAlbumForm(createHandler, "Create Album")}
        </Modal.Body>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        size="lg"
        className="admin-modal"
      >
        <Modal.Header closeButton className="album-modal-header">
          <div>
            <span>Portfolio Manager</span>
            <Modal.Title>Edit Album</Modal.Title>
            <p>Refine album details, imagery and presentation.</p>
          </div>
        </Modal.Header>

        <Modal.Body>
          {renderAlbumForm(updateHandler, "Update Album")}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminAlbumsScreen;
