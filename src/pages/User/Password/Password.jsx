import React from 'react'
import * as S from '../Profile/profile.style'
import InputPassword from '../../../components/InputPassword/InputPassword'
import { PasswordContent } from './password.style'

export default function Password() {
  return (
    <S.Profile>
      <S.ProfileHeader>
        <S.ProfileHeaderTitle>Đổi mật khẩu</S.ProfileHeaderTitle>
        <S.ProfileHeaderSubTitle>
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </S.ProfileHeaderSubTitle>
        <PasswordContent>
          <S.InputLabel>
            <S.InputLabelLabel>Mật khẩu cũ</S.InputLabelLabel>
            <S.InputLabelContent>
              <InputPassword name="password" />
            </S.InputLabelContent>
          </S.InputLabel>

          <S.InputLabel>
            <S.InputLabelLabel>Mật khẩu mới</S.InputLabelLabel>
            <S.InputLabelContent>
              <InputPassword name="new_password" />
            </S.InputLabelContent>
          </S.InputLabel>

          <S.InputLabel>
            <S.InputLabelLabel>Nhập lại mật khẩu mới</S.InputLabelLabel>
            <S.InputLabelContent>
              <InputPassword name="confirm_new_password" />
            </S.InputLabelContent>
          </S.InputLabel>

          <S.Submit>
            <S.ButtonSubmit type="submit">Lưu</S.ButtonSubmit>
          </S.Submit>
        </PasswordContent>
      </S.ProfileHeader>
    </S.Profile>
  )
}
