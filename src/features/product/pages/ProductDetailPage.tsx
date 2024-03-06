import productApi from 'api/productApi';
import { useAppSelector } from 'redux/hooks';
import warrantyIcon from 'assets/images/warranty_icon.png';
import { Breadcrumb } from 'components/Common';
import { CoinIcon } from 'components/Icons/CoinIcon';
import { ProductInfo } from 'models/product/productInfo';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomInputNumber from '../components/CustomInputNumber';
import ProductDetailOption from '../components/ProductDetailOption';
import ProductDetailReview from '../components/ProductDetailReview';
import RateSummary from '../components/RateSummary';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'antd';

interface ProductDetailPageProps {}

const ProductDetailPage: React.FunctionComponent<ProductDetailPageProps> = (props) => {
  const [productDetail, setProductDetail] = useState<ProductInfo>();
  const token = useRef(localStorage.getItem('accessToken')).current || '';
  const [quantity, setQuantity] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number | boolean>(false);
  const { t } = useTranslation();

  const locate = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const productId = Number(locate.pathname.split('/')[2]);
    getProductDetail(productId);
  }, []);

  const getProductDetail = useCallback(async (id: number) => {
    const res = await productApi.getProduct(id);
    if (res) {
      setProductDetail(res.data[0]);
    }
  }, []);

  const handleBuy = () => {
    // if (isLoggedIn) {
    //   setOpenModal(true);
    // } else navigate('/login');
    setOpenModal(true);
  };

  const onChangeNumber = (value: number) => {
    value >= 1 && setQuantity(value);
  };

  useEffect(() => {
    orderId && navigate(`/cart?state=${orderId}`);
  }, [orderId]);

  return (
    <div className="container">
      <div className="product-detail">
        <Breadcrumb />
        <div className="product-detail__container">
          <div className="product-detail__left-side">
            <div className="product-detail__img-container">
              {productDetail ? (
                <img src={productDetail.pictureUrl} alt="product" />
              ) : (
                <Skeleton.Image className="product__skeleton-img" />
              )}
            </div>
          </div>

          <div className="product-detail__right-side">
            {productDetail ? (
              <>
                <div className="product-detail__header-container">
                  <div className="product-detail__header">{productDetail.name}</div>
                  <RateSummary rateNumber={3.5} />
                </div>

                <div className="product-detail__price">
                  <CoinIcon /> {productDetail.price * quantity}
                </div>

                <div className="product-detail__category-container">
                  <div className="product-detail__quantity">
                    <span>{t('product.detail.quantity')}</span>
                    <CustomInputNumber value={quantity} onChange={onChangeNumber} />
                    <span>12013 {t('product.detail.available')}</span>
                  </div>
                </div>

                <ProductDetailOption handleBuy={handleBuy} />

                <div className="product-detail__warranty">
                  <img src={warrantyIcon} alt="warranty icon" />
                  <span>{t('product.detail.warranty')}</span>
                  <span>3 {t('product.detail.refund_day')}</span>
                </div>
              </>
            ) : (
              <>
                <Skeleton active />
                <Skeleton active />
              </>
            )}
          </div>
        </div>

        <div className="product-detail__container column">
          <div className="product-detail__content">
            <h2 className="product-content__header">{t('product.detail.detail')}</h2>
            <div className="product-content__description">
              {productDetail ? (
                <div className="product-category">
                  <p className="product__category-item">
                    <span>{t('product.detail.type')}</span>
                    <span>{productDetail.category.name}</span>
                  </p>
                  <p className="product__category-item">
                    <span>{t('product.detail.warehouse')}</span>
                    <span>19408424</span>
                  </p>
                  <p className="product__category-item">
                    <span>{t('product.detail.from')}</span>
                    <span>Hà Nội</span>
                  </p>
                </div>
              ) : (
                <Skeleton active />
              )}
            </div>
          </div>

          <div className="product-detail__content">
            <h2 className="product-content__header">{t('product.detail.description')}</h2>
            {productDetail ? (
              <div className="product-content__description">{productDetail.description}</div>
            ) : (
              <Skeleton active />
            )}
          </div>
        </div>

        <div className="product-detail__container">
          <ProductDetailReview />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
