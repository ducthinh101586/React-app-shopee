import React from 'react'
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import SearchItemResult from '../../components/SearchItemResult/SearchItemResult'
import * as S from './home.style'

export default function Home() {
  return (
    <div>
      <S.Container className="container">
        <S.Side>
          <FilterPanel />
        </S.Side>
        <S.Main>
          <SearchItemResult />
        </S.Main>
      </S.Container>
    </div>
  )
}
