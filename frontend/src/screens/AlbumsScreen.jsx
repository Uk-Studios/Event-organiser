import {
  Row,
  Col,
  Spinner,
  Container,
} from 'react-bootstrap'

import {
  useEffect,
  useState,
} from 'react'

import { getAlbums } from '../services/albumService'
import { getGalleryItems } from '../services/galleryService'

import AlbumCard from '../components/AlbumCard'

import '../styles/albumsScreen.css'

const AlbumsScreen = () => {

  const [albums, setAlbums] =
    useState([])

  const [galleryItems, setGalleryItems] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const fetchAlbums = async () => {

      try {

        const [albumData, galleryData] =
          await Promise.all([
            getAlbums(),
            getGalleryItems(),
          ])

        setAlbums(albumData)
        setGalleryItems(galleryData)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }

    }

    fetchAlbums()

  }, [])

  if (loading) {

    return (

      <div className="albums-loader">

        <Spinner animation="border" />

      </div>

    )
  }

  return (

    <section className="albums-page">

      <Container>


        {albums.length > 0 && (

          <div className="album-collection-heading">
            <span>Collections</span>
            <h2>Event Albums</h2>
          </div>

        )}

        <Row className="g-4">

          {albums.map((album) => (

            <Col
              key={album._id}
              lg={4}
              md={6}
              sm={6}
              xs={12}
            >

              <AlbumCard album={album} />

            </Col>

          ))}

        </Row>

      </Container>

    </section>

  )
}

export default AlbumsScreen
