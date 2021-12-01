import React, { Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { path } from '../Constants/path'
import { useAuthenticated } from '../hooks/useAuthenticated'
import PropTypes from 'prop-types'

export default function UnauthenticatedGuard({ children }) {
  const authenticated = useAuthenticated()

  if (authenticated) {
    return <Navigate to={path.home} />
  }
  return <Fragment>{children}</Fragment>
}

UnauthenticatedGuard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
}
