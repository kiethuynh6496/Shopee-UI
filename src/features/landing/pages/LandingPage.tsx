import productApi from 'api/productApi';
import slider1 from 'assets/images/banner_slider1.png';
import banner1 from 'assets/images/header_banner1.png';
import banner2 from 'assets/images/header_banner2.png';
import { ProductCard } from 'components/Common';
import { ProductInfo } from 'models/product/productInfo';
import React, { useCallback, useEffect, useState } from 'react';
import Banner from '../components/Banner';
import CategoryContainer from '../components/CategoryContainer';
import { Skeleton } from 'antd';
import Pagination from 'antd/es/pagination';

interface LandingPageProps {}

const LandingPage: React.FunctionComponent<LandingPageProps> = (props) => {
  const [productInfo, setProductInfo] = useState<ProductInfo[] | null>(null);
  const [total, setTotal] = useState<number>(12);

  const getProduct = useCallback(async () => {
    const res = await productApi.getAllProduct();
    console.log(res);
    if (res.statusCode === 200) setProductInfo(res.data);
  }, []);

  const handlePagination = async (page: number, pageSize: number) => {
    const res = await productApi.getProductPagination(page, (pageSize = 12));
    if (res.statusCode === 200) {
      setProductInfo(res.data);
      if (res.data.length >= 12) {
        setTotal(page * pageSize);
      }
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="container">
      <div className="landing-content">
        <Banner slider1={slider1} banner1={banner1} banner2={banner2} />

        <CategoryContainer />

        <div className="landing-content__header">
          <span>GỢI Ý HÔM NAY</span>
        </div>

        <div className="landing__list-items">
          {productInfo
            ? productInfo.map((e, i) => <ProductCard key={i} info={e} />)
            : Array.from({ length: 6 }, () => Math.random()).map((e, i) => (
                <Skeleton key={i} active />
              ))}
        </div>
        <Pagination defaultCurrent={1} total={total} onChange={handlePagination} />
      </div>
    </div>
  );
};

export default LandingPage;
