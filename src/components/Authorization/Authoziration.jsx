import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { path } from '../../Constants/path'
import { useAuthenticated } from '../../hooks/useAuthenticated'
import { unauthorize } from '../../pages/Auth/auth.slice'
import { getCartPurchases } from '../../pages/Cart/cart.slice'

export default function Authoziration() {
  const status = useSelector(state => state.app.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authenticated = useAuthenticated()
  useEffect(() => {
    if (status === 401) {
      dispatch(unauthorize())
      navigate(path.login)
    }
  }, [dispatch, navigate, status])

  useEffect(() => {
    if (authenticated) {
      dispatch(getCartPurchases())
    }
  }, [dispatch, authenticated])
  return null
}
