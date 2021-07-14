import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../assets/styles/until'
import InputPassword from '../../../components/InputPassword/InputPassword'
import InputText from '../../../components/InputText/InputText'
import { path } from '../../../Constants/path'
import * as S from './register.style'

export default function Register() {
  return (
    <div>
      <S.StyledRegister>
        <S.Container className="container">
          <S.Banner />
          <S.FormWrapper>
            <S.FormTitle>Đăng ký</S.FormTitle>
            <S.Form noValidate>
              <S.FormControl>
                <InputText type="email" name="email" placeholder="Email" />
              </S.FormControl>
              <S.FormControl>
                <InputPassword placeholder="Mật khẩu" name="password" />
              </S.FormControl>
              <S.FormControl>
                <InputPassword placeholder="Nhập lại mật khẩu" name="ConfirmPassword" />
              </S.FormControl>
              <S.FormButton>
                <Button type="submit">Đăng ký</Button>
              </S.FormButton>
            </S.Form>
            <S.FormFooter>
              <span>Bạn đã có tài khoản?</span>
              <Link to={path.login} className="link">
                Đăng Nhập
              </Link>
            </S.FormFooter>
          </S.FormWrapper>
        </S.Container>
      </S.StyledRegister>
    </div>
  )
}
