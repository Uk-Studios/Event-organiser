import {
  Card,
  Col,
  Row,
} from 'react-bootstrap'
import { useEffect, useMemo, useState } from 'react'

import api from '../services/api'

import '../styles/AdminDashboard.css'

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const AdminDashboardScreen = () => {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo')) || {}

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const { data } = await api.get('/enquiries', {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`,
          },
        })

        setEnquiries(data)
        setError('')
      } catch {
        setError('Unable to load realtime enquiries right now.')
      } finally {
        setLoading(false)
      }
    }

    fetchEnquiries()

    const refreshTimer = setInterval(fetchEnquiries, 30000)

    return () => clearInterval(refreshTimer)
  }, [adminInfo.token])

  const dashboardData = useMemo(() => {
    const statusCounts = enquiries.reduce(
      (counts, enquiry) => {
        const status = enquiry.status || 'new'

        return {
          ...counts,
          [status]: (counts[status] || 0) + 1,
        }
      },
      {
        new: 0,
        contacted: 0,
        converted: 0,
        closed: 0,
      },
    )

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const monthlyEnquiries = Array.from({ length: 12 }, (_, index) => {
      const monthDate = new Date(currentYear, currentMonth - 11 + index, 1)

      return {
        label: monthNames[monthDate.getMonth()],
        month: monthDate.getMonth(),
        year: monthDate.getFullYear(),
        total: 0,
      }
    })

    enquiries.forEach((enquiry) => {
      const enquiryDate = new Date(enquiry.createdAt)

      if (Number.isNaN(enquiryDate.getTime())) {
        return
      }

      const month = monthlyEnquiries.find(
        (item) => item.month === enquiryDate.getMonth()
          && item.year === enquiryDate.getFullYear(),
      )

      if (month) {
        month.total += 1
      }
    })

    const todayTotal = enquiries.filter((enquiry) => {
      const enquiryDate = new Date(enquiry.createdAt)
      const today = new Date()

      return enquiryDate.toDateString() === today.toDateString()
    }).length

    const latestEnquiries = enquiries.slice(0, 5)

    return {
      statusCounts,
      monthlyEnquiries,
      todayTotal,
      latestEnquiries,
    }
  }, [enquiries])

  const chartWidth = 720
  const chartHeight = 260
  const chartPadding = 36
  const maxTotal = Math.max(
    ...dashboardData.monthlyEnquiries.map((item) => item.total),
    1,
  )

  const chartPoints = dashboardData.monthlyEnquiries.map((item, index) => {
    const x = chartPadding
      + (index * (chartWidth - chartPadding * 2))
        / (dashboardData.monthlyEnquiries.length - 1)
    const y = chartHeight - chartPadding
      - (item.total / maxTotal) * (chartHeight - chartPadding * 2)

    return {
      ...item,
      x,
      y,
    }
  })

  const chartPath = chartPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  const metrics = [
    {
      label: 'Realtime Enquiries',
      value: enquiries.length,
      detail: `${dashboardData.todayTotal} received today`,
    },
    {
      label: 'New Requests',
      value: dashboardData.statusCounts.new,
      detail: 'Waiting for first response',
    },
    {
      label: 'Active Follow Ups',
      value: dashboardData.statusCounts.contacted,
      detail: 'Clients already contacted',
    },
    {
      label: 'Converted',
      value: dashboardData.statusCounts.converted,
      detail: 'Enquiries turned into bookings',
    },
  ]

  const formatDate = (value) => (
    value
      ? new Date(value).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      : 'No date'
  )

  if (loading) {
    return <div className="admin-loading">Loading realtime dashboard...</div>
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header admin-page-header-row">
        <div>
          <span>Realtime Overview</span>
          <h1>Enquiry Dashboard</h1>
          <p>
            Track every enquiry, current lead status and month-wise demand from one workspace.
          </p>
        </div>

        <div className="dashboard-live-pill">
          Live data
        </div>
      </div>

      {error && (
        <div className="dashboard-alert">
          {error}
        </div>
      )}

      <Row className="g-4">
        {metrics.map((metric) => (
          <Col
            key={metric.label}
            xs={12}
            md={6}
            xl={3}
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

      <Row className="g-4 dashboard-section">
        <Col
          xs={12}
          xl={8}
        >
          <Card className="dashboard-chart-card">
            <Card.Body>
              <div className="dashboard-section-title">
                <div>
                  <span>Month Wise Total</span>
                  <h3>Total Enquiries</h3>
                </div>

                <strong>{enquiries.length}</strong>
              </div>

              <div className="dashboard-chart-wrap">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  role="img"
                  aria-label="Month wise total enquiry line chart"
                >
                  <line
                    x1={chartPadding}
                    x2={chartWidth - chartPadding}
                    y1={chartHeight - chartPadding}
                    y2={chartHeight - chartPadding}
                    className="chart-axis"
                  />

                  <path
                    d={chartPath}
                    className="chart-line"
                  />

                  {chartPoints.map((point) => (
                    <g key={`${point.label}-${point.year}`}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="6"
                        className="chart-point"
                      />
                      <text
                        x={point.x}
                        y={point.y - 14}
                        className="chart-value"
                        textAnchor="middle"
                      >
                        {point.total}
                      </text>
                      <text
                        x={point.x}
                        y={chartHeight - 10}
                        className="chart-label"
                        textAnchor="middle"
                      >
                        {point.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col
          xs={12}
          xl={4}
        >
          <Card className="dashboard-details-card">
            <Card.Body>
              <div className="dashboard-section-title compact">
                <div>
                  <span>Details</span>
                  <h3>Latest Enquiries</h3>
                </div>
              </div>

              <div className="dashboard-enquiry-list">
                {dashboardData.latestEnquiries.length === 0 && (
                  <div className="dashboard-empty">
                    No enquiries available yet.
                  </div>
                )}

                {dashboardData.latestEnquiries.map((enquiry) => (
                  <div
                    key={enquiry._id}
                    className="dashboard-enquiry-item"
                  >
                    <div>
                      <h4>{enquiry.name}</h4>
                      <p>{enquiry.eventType || 'Event enquiry'}</p>
                    </div>

                    <div className="dashboard-enquiry-meta">
                      <span className={`status-badge ${enquiry.status || 'new'}`}>
                        {enquiry.status || 'new'}
                      </span>
                      <small>{formatDate(enquiry.createdAt)}</small>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AdminDashboardScreen
