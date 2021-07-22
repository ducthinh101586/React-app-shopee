import { Link } from 'react-router-dom'
import React from 'react'
import * as S from './productItem.style'
import ProductRating from '../ProductRating/ProductRating'

export default function ProductItem() {
  return (
    <S.Product>
      <Link to="">
        <S.ProductItem>
          <S.ProductItemImage>
            <img src="https://cf.shopee.vn/file/3e07638a8d13e0f877fd94df3fb2f849_tn" alt="" />
          </S.ProductItemImage>
          <S.ProductItemInfo>
            <S.ProductItemTitle>Bong bóng màu bánh macaron xinh xắn dùng để trang trí tiệc</S.ProductItemTitle>
            <S.ProductItemPrice>
              <S.ProductItemOriginal>8.888 đ</S.ProductItemOriginal>
              <S.ProductItemSale>0 đ</S.ProductItemSale>
            </S.ProductItemPrice>
            <S.ProductItemMeta>
              <ProductRating />
              <S.ProductItemSold>
                <span>1.7k</span>
                <span>Đã bán</span>
              </S.ProductItemSold>
            </S.ProductItemMeta>
          </S.ProductItemInfo>
        </S.ProductItem>
      </Link>
    </S.Product>
  )
}
