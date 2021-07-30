import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { path } from '../../Constants/path'
import { unauthorize } from '../../pages/Auth/auth.slice'

export default function Authoziration() {
  const status = useSelector(state => state.app.status)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    if (status === 401) {
      dispatch(unauthorize())
      history.push(path.login)
    }
  }, [dispatch, history, status])
  return null
}
