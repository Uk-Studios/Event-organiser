import api from './api'

export const getGalleryItems = async () => {
  const { data } = await api.get('/gallery')

  return data
}

export const createGalleryItem = async (
  galleryData,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await api.post(
    '/gallery',
    galleryData,
    config
  )

  return data
}

export const updateGalleryItem = async (
  id,
  galleryData,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await api.put(
    `/gallery/${id}`,
    galleryData,
    config
  )

  return data
}

export const deleteGalleryItem = async (
  id,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const { data } = await api.delete(
    `/gallery/${id}`,
    config
  )

  return data
}
