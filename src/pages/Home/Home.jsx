import React from 'react'
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import * as S from './home.style'

export default function Home() {
  return (
    <div>
      <S.Container className="container">
        <S.Side>
          <FilterPanel />
        </S.Side>
        <S.Main></S.Main>
      </S.Container>
    </div>
  )
}
