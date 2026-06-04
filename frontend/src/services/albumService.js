import api from './api'

export const getAlbums = async () => {

  const { data } =
    await api.get('/albums')

  return data
}

export const deleteAlbum = async (
  id,
  token
) => {

  const config = {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }

  const { data } =
    await api.delete(
      `/albums/${id}`,
      config
    )

  return data
}

export const createAlbum = async (
  albumData,
  token
) => {

  const config = {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }

  const { data } =
    await api.post(
      '/albums',
      albumData,
      config
    )

  return data
}

export const updateAlbum =
  async (
    id,
    albumData,
    token
  ) => {

    const config = {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }

    const { data } =
      await api.put(
        `/albums/${id}`,
        albumData,
        config
      )

    return data
}