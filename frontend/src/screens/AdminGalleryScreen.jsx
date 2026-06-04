import { useEffect, useState } from 'react'

import {
  Button,
  Form,
  Modal,
} from 'react-bootstrap'

import { toast } from 'react-toastify'

import api from '../services/api'

import {
  createGalleryItem,
  deleteGalleryItem,
  getGalleryItems,
  updateGalleryItem,
} from '../services/galleryService'

import '../styles/AdminGallery.css'

const AdminGalleryScreen = () => {
  const [galleryItems, setGalleryItems] =
    useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const adminInfo = JSON.parse(
    localStorage.getItem('adminInfo')
  )

  const fetchGalleryItems = async () => {
    try {
      const data = await getGalleryItems()
      setGalleryItems(data)
    } catch (error) {
      toast.error('Failed to load gallery')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const resetForm = () => {
    setImage('')
    setDescription('')
    setEditingItem(null)
  }

  const openCreateModal = () => {
    resetForm()
    setShowModal(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setImage(item.image)
    setDescription(item.description)
    setShowModal(true)
  }

  const uploadHandler = async (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('images', file)

    try {
      setUploading(true)

      const { data } = await api.post(
        '/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setImage(data.images[0])
      toast.success('Image uploaded')
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        'Upload failed'
      )
    } finally {
      setUploading(false)
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault()

    try {
      const payload = {
        image,
        description,
      }

      if (editingItem) {
        await updateGalleryItem(
          editingItem._id,
          payload,
          adminInfo.token
        )
        toast.success('Gallery photo updated')
      } else {
        await createGalleryItem(
          payload,
          adminInfo.token
        )
        toast.success('Gallery photo added')
      }

      setShowModal(false)
      resetForm()
      fetchGalleryItems()
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        'Save failed'
      )
    }
  }

  const deleteHandler = async (id) => {
    if (!window.confirm('Delete this gallery photo?')) {
      return
    }

    try {
      await deleteGalleryItem(id, adminInfo.token)
      toast.success('Gallery photo deleted')
      fetchGalleryItems()
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        'Delete failed'
      )
    }
  }

  if (loading) {
    return (
      <div className="admin-loading">
        Loading gallery...
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header admin-page-header-row">
        <div>
          <span>Portfolio Assets</span>
          <h1>Gallery</h1>
          <p>
            Add individual event photos with short descriptions for the home portfolio
            and public portfolio page.
          </p>
        </div>

        <Button
          className="admin-primary-btn"
          onClick={openCreateModal}
        >
          Add Photo
        </Button>
      </div>

      <div className="admin-gallery-grid">
        {galleryItems.map((item) => (
          <article
            className="admin-gallery-card"
            key={item._id}
          >
            <img src={item.image} alt={item.description} />

            <div className="admin-gallery-card-body">
              <span>Gallery Photo</span>
              <p>{item.description}</p>

              <div className="admin-card-actions">
                <Button
                  className="admin-soft-btn"
                  size="sm"
                  onClick={() => openEditModal(item)}
                >
                  Edit
                </Button>

                <Button
                  className="admin-danger-btn"
                  size="sm"
                  onClick={() => deleteHandler(item._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="admin-modal"
      >
        <Modal.Header
          closeButton
          className="gallery-modal-header"
        >
          <div>
            <span>Gallery Manager</span>
            <Modal.Title>
              {editingItem ? 'Edit Photo' : 'Add Photo'}
            </Modal.Title>
            <p>
              Upload one portfolio image and add a simple public-facing description.
            </p>
          </div>
        </Modal.Header>

        <Modal.Body>
          <Form
            className="admin-form gallery-form"
            onSubmit={submitHandler}
          >
            <div className="gallery-upload-panel">
              <Form.Label>Photo</Form.Label>

              <Form.Control
                type="file"
                accept="image/*"
                onChange={uploadHandler}
              />

              <div className="gallery-upload-preview">
                {image ? (
                  <img src={image} alt="" />
                ) : (
                  <span>
                    {uploading ? 'Uploading...' : 'No image selected'}
                  </span>
                )}
              </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Example: Candlelit reception with layered florals and intimate tablescape."
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="admin-primary-btn w-100"
              disabled={!image || uploading}
            >
              {editingItem ? 'Update Photo' : 'Add Photo'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AdminGalleryScreen
