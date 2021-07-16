import React from 'react'
import * as S from '../Register/register.style'
import { useForm, Controller } from 'react-hook-form'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage'
import InputPassword from '../../../components/InputPassword/InputPassword'
import InputText from '../../../components/InputText/InputText'
import { path } from '../../../Constants/path'
import { rules } from '../../../Constants/rules'
import { Button } from '../../../assets/styles/until'
import { Link } from '@material-ui/core'

export default function Login() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleLogin = async data => {
    console.log(data)
  }

  return (
    <S.StyledRegister>
      <S.Container className="container">
        <S.Banner />
        <S.FormWrapper>
          <S.FormTitle>Đăng Nhập</S.FormTitle>
          <S.Form onSubmit={handleSubmit(handleLogin)} noValidate>
            <S.FormControl>
              <Controller
                name="email"
                control={control}
                rules={rules.email}
                render={({ field }) => (
                  <InputText
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={event => field.onChange(event)}
                    value={getValues('email')}
                  />
                )}
              />
              <ErrorMessage errors={errors} name="email" />
            </S.FormControl>
            <S.FormControl>
              <Controller
                name="password"
                control={control}
                rules={rules.password}
                render={({ field }) => (
                  <InputPassword
                    placeholder="Mật khẩu"
                    name="password"
                    onChange={field.onChange}
                    value={getValues('password')}
                  />
                )}
              />
              <ErrorMessage errors={errors} name="password" />
            </S.FormControl>
            <S.FormButton>
              <Button type="submit">Đăng Nhập</Button>
            </S.FormButton>
          </S.Form>
          <S.FormFooter>
            <span>Bạn mới biết đến Shopee?</span>
            <Link to={path.register} className="link">
              Đăng Ký
            </Link>
          </S.FormFooter>
        </S.FormWrapper>
      </S.Container>
    </S.StyledRegister>
  )
}
