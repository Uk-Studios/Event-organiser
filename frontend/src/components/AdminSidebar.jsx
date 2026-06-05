import { Button, Nav } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import "../styles/AdminSidebar.css";

import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("adminInfo");

    navigate("/admin/login");
  };

  return (
    <>
      <div className="admin-sidebar">
        <div className="sidebar-brand">
          <span>UK</span>
          <div>
            <h3 className="sidebar-logo">Uk Studio</h3>
            <p>Admin Console</p>
          </div>
        </div>

        <Nav className="flex-column">
          <LinkContainer to="/admin/dashboard">
            <Nav.Link>Dashboard</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/admin/albums">
            <Nav.Link>Portfolio Albums</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/admin/gallery">
            <Nav.Link>Gallery</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/admin/enquiries">
            <Nav.Link>Enquiries</Nav.Link>
          </LinkContainer>
        </Nav>

        <Button
          className="logout-btn"
          onClick={logoutHandler}
        >
          Logout
        </Button>
        
      </div>

      
    </>
  );
};

export default AdminSidebar;
