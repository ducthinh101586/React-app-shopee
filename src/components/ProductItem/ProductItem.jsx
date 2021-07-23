import { Link } from 'react-router-dom'
import React from 'react'
import * as S from './productItem.style'
import ProductRating from '../ProductRating/ProductRating'
import PropTypes from 'prop-types'
import { path } from '../../Constants/path'
import { formatK, formatMoney, generateNameId } from '../../utils/helper'

export default function ProductItem({ product }) {
  return (
    <S.Product>
      <Link to={path.product + `/${generateNameId(product)}`}>
        <S.ProductItem>
          <S.ProductItemImage>
            <img src={product.image} alt={product.name} />
          </S.ProductItemImage>
          <S.ProductItemInfo>
            <S.ProductItemTitle>{product.name}</S.ProductItemTitle>
            <S.ProductItemPrice>
              <S.ProductItemOriginal>đ{formatMoney(product.price_before_discount)}</S.ProductItemOriginal>
              <S.ProductItemSale>đ{formatMoney(product.price)}</S.ProductItemSale>
            </S.ProductItemPrice>
            <S.ProductItemMeta>
              <ProductRating />
              <S.ProductItemSold>
                <span>{formatK(product.sold)}</span>
                <span>Đã bán</span>
              </S.ProductItemSold>
            </S.ProductItemMeta>
          </S.ProductItemInfo>
        </S.ProductItem>
      </Link>
    </S.Product>
  )
}
ProductItem.propTypes = {
  product: PropTypes.object
}
