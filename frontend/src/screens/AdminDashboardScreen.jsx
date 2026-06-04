import {
  Card,
  Col,
  Row,
} from 'react-bootstrap'

import '../styles/AdminDashboard.css'

const metrics = [
  {
    label: 'Total Albums',
    value: '12',
    detail: 'Published event collections',
  },
  {
    label: 'Total Enquiries',
    value: '28',
    detail: 'Client requests received',
  },
  {
    label: 'Pending Replies',
    value: '7',
    detail: 'Need follow-up today',
  },
]

const AdminDashboardScreen = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span>Overview</span>
          <h1>Dashboard</h1>
          <p>
            Monitor enquiries, portfolio updates and planning activity from one workspace.
          </p>
        </div>
      </div>

      <Row className="g-4">
        {metrics.map((metric) => (
          <Col
            key={metric.label}
            xs={12}
            md={6}
            lg={4}
          >
            <Card className="dashboard-card">
              <Card.Body>
                <div className="dashboard-card-top">
                  <span>{metric.label}</span>
                  <div className="dashboard-dot"></div>
                </div>

                <h2>{metric.value}</h2>
                <p>{metric.detail}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      
    </div>
  )
}

export default AdminDashboardScreen
