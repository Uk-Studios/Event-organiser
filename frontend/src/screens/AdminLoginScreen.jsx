import {
  Container,
  Form,
  Button,
  Card,
} from 'react-bootstrap'

import {
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import {
  toast,
} from 'react-toastify'

import {
  loginAdmin,
} from '../services/authService'

import '../styles/AdminAuth.css'

const AdminLoginScreen = () => {

  const navigate = useNavigate()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const submitHandler = async (
    e
  ) => {

    e.preventDefault()

    try {

      setLoading(true)

      const data =
        await loginAdmin(
          email,
          password
        )

      localStorage.setItem(
        'adminInfo',
        JSON.stringify(data)
      )

      toast.success(
        'Login Successful'
      )

      navigate(
        '/admin/dashboard'
      )

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        'Invalid Credentials'
      )

    } finally {

      setLoading(false)
    }
  }

  return (
    <section className="admin-auth-page">

      <Container>

        <div
          className="
            d-flex
            justify-content-center
          "
        >

          <Card className="admin-auth-card">

            <span>
              Admin Console
            </span>

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to manage albums, enquiries and dashboard activity.
            </p>

            <Form
              onSubmit={
                submitHandler
              }
            >

              <Form.Group
                className="mb-3"
              >

                <Form.Label>
                  Email
                </Form.Label>

                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  required
                />

              </Form.Group>

              <Form.Group
                className="mb-4"
              >

                <Form.Label>
                  Password
                </Form.Label>

                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                />

              </Form.Group>

              <Button
                type="submit"
                className="admin-primary-btn w-100"
                disabled={loading}
              >

                {
                  loading
                    ? 'Logging In...'
                    : 'Sign In'
                }

              </Button>

            </Form>

          </Card>

        </div>

      </Container>

    </section>
  )
}

export default AdminLoginScreen
