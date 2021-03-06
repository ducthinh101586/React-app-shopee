import React, { Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { path } from '../Constants/path'
import { useAuthenticated } from '../hooks/useAuthenticated'
import PropTypes from 'prop-types'

export default function AuthenticatedGuard({ children }) {
  const authenticated = useAuthenticated()

  if (!authenticated) {
    return <Navigate to={path.login} />
  }
  return <Fragment>{children}</Fragment>
}
AuthenticatedGuard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
}
