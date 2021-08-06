import React from 'react'
import * as S from '../Profile/profile.style'
import InputPassword from '../../../components/InputPassword/InputPassword'
import { PasswordContent } from './password.style'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { rules } from '../../../Constants/rules'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage'
import { unwrapResult } from '@reduxjs/toolkit'
import { updateMe } from '../../Auth/auth.slice'
import { toast } from 'react-toastify'

export default function Password() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
    reset
  } = useForm({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_new_password: ''
    }
  })
  const dispatch = useDispatch()

  const update = async data => {
    const body = { password: data.password, new_password: data.new_password }
    try {
      await dispatch(updateMe(body)).then(unwrapResult)
      reset()
      toast.success('Đổi mật khẩu thành công', {
        position: 'top-center',
        autoClose: 1500
      })
    } catch (error) {
      if (error.status === 422) {
        for (const key in error.data) {
          setError(key, {
            type: 'server',
            message: error.data[key]
          })
        }
      }
    }
  }

  return (
    <S.Profile>
      <S.ProfileHeader>
        <S.ProfileHeaderTitle>Đổi mật khẩu</S.ProfileHeaderTitle>
        <S.ProfileHeaderSubTitle>
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </S.ProfileHeaderSubTitle>
        <PasswordContent onSubmit={handleSubmit(update)}>
          <S.InputLabel>
            <S.InputLabelLabel>Mật khẩu cũ</S.InputLabelLabel>
            <S.InputLabelContent>
              <Controller
                name="password"
                control={control}
                rules={rules.password}
                render={({ field }) => (
                  <InputPassword name="password" onChange={field.onChange} value={getValues('password')} />
                )}
              />
              <ErrorMessage errors={errors} name="password" />
            </S.InputLabelContent>
          </S.InputLabel>

          <S.InputLabel>
            <S.InputLabelLabel>Mật khẩu mới</S.InputLabelLabel>
            <S.InputLabelContent>
              <Controller
                name="new_password"
                control={control}
                rules={rules.new_password}
                render={({ field }) => (
                  <InputPassword name="new_password" onChange={field.onChange} value={getValues('new_password')} />
                )}
              />
              <ErrorMessage errors={errors} name="new_password" />
            </S.InputLabelContent>
          </S.InputLabel>

          <S.InputLabel>
            <S.InputLabelLabel>Nhập lại mật khẩu mới</S.InputLabelLabel>
            <S.InputLabelContent>
              <Controller
                name="confirm_new_password"
                control={control}
                rules={{
                  ...rules.password,
                  validate: {
                    samePassword: v => v === getValues('new_password') || 'Mật khẩu nhập lại không khớp'
                  }
                }}
                render={({ field }) => (
                  <InputPassword
                    name="confirm_new_password"
                    onChange={field.onChange}
                    value={getValues('confirm_new_password')}
                  />
                )}
              />
              <ErrorMessage errors={errors} name="confirm_new_password" />
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
