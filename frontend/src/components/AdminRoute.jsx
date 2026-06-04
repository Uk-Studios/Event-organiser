import {
  Navigate,
  Outlet,
} from 'react-router-dom'

const AdminRoute = () => {

  const adminInfo =
    JSON.parse(
      localStorage.getItem(
        'adminInfo'
      )
    )

  return adminInfo
    ? <Outlet />
    : <Navigate to="/admin/login" />
}

export default AdminRoute