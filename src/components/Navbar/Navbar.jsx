import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { path } from '../../Constants/path'
import { useAuthenticated } from '../../hooks/useAuthenticated'
import usePopover from '../../hooks/usePopover'
import { logout } from '../../pages/Auth/auth.slice'
import Popover from '../Popover/Popover'
import * as S from './navbar.style'

export default function Navbar() {
  const authenticated = useAuthenticated()
  const profile = useSelector(state => state.auth.profile)
  const { activePopover, showPopover, hidePopover } = usePopover()
  const dispatch = useDispatch()
  const handleLogout = () => dispatch(logout())

  return (
    <S.Navbar>
      <S.NavMenu>
        {authenticated && (
          <li>
            <S.User onMouseEnter={showPopover} onMouseLeave={hidePopover}>
              <S.UserImage src="https://cf.shopee.vn/file/858368a93c885a4b6ca0d1b07eabad6c_tn" />
              <S.Username>{profile.name || profile.email}</S.Username>
              <Popover active={activePopover}>
                <S.UserLink to={path.user}>Tài khoản của tôi</S.UserLink>
                <S.UserLink to={path.purchase}>Đơn mua</S.UserLink>
                <S.UserButton onClick={handleLogout}>Đăng xuất</S.UserButton>
              </Popover>
            </S.User>
          </li>
        )}

        {!authenticated && (
          <Fragment>
            <li>
              <S.NavLink to={path.register}>Đăng ký</S.NavLink>
            </li>
            <li>
              <S.NavLink to={path.login}>Đăng Nhập</S.NavLink>
            </li>
          </Fragment>
        )}
      </S.NavMenu>
    </S.Navbar>
  )
}
