import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'

export const Navbar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
`
export const NavMenu = styled.ul`
  display: flex;
  margin-bottom: 0;
`
export const NavLink = styled(Link)`
  color: #fff;
  margin: 0 1rem;
  &:hover {
    color: hsla(0, 0%, 100%, 0.7);
  }
`
// Popover
export const PopoverEnterAnimation = keyframes`
  0%{
    transform: scale(0);
    opacity: 0;
  }
  to{
    transform: scale(1);
    opacity:1;
  }
`

export const Drawer = styled.div`
  top: 100%;
  right: 0;
  position: absolute;
  will-change: transform;
  animation: ${PopoverEnterAnimation} 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  opacity: 1;
  z-index: 400;
  border: 1px solid rgba(0, 0, 0, 0.09);
  :before {
    position: absolute;
    top: -10px;
    left: 0;
    content: '';
    height: 10px;
    opacity: 0;
    width: 100%;
  }
`
export const PopoverArow = styled.div`
  border-bottom: 10px solid rgb(255, 255, 255);
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  top: -10px;
  position: absolute;
  right: 6px;
  width: 0;
  height: 0;
`
export const PopoverContent = styled.div`
  box-shadow: 0 1px 3.125rem 0 rgb(0 0 0 /20%);
  border-radius: 0.125rem;
  overflow: hidden;
  background-color: #fff;
`
export const User = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  cursor: pointer;
  margin: 0 1rem;
  ${Drawer} {
    width: 15rem;
    top: 135%;
  }
`
export const UserImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
`
export const Username = styled.div`
  padding-left: 5px;
  max-width: 15rem;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const UserLink = styled(Link)`
  color: rgba(0, 0, 0, 0.8);
  padding: 1rem 0 1rem 1.5rem;
  display: block;
  width: 100%;
  text-align: left;
  &:hover {
    background-color: #fafafa;
    color: #00bfa5;
  }
`
export const UserButton = styled.button`
  color: rgba(0, 0, 0, 0.8);
  padding: 1rem 0 1rem 1.5rem;
  display: block;
  background: transparent;
  border: 0;
  width: 100%;
  text-align: left;
  &:hover {
    background-color: #fafafa;
    color: #00bfa5;
  }
`
