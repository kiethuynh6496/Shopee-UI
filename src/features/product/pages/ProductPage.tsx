import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Skeleton } from 'antd';
import productApi from 'api/productApi';
import { ProductCard } from 'components/Common';
import { ModalComponent } from 'components/Common/ModalComponent';
import { ProductInfo } from 'models/product/productInfo';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductModifyModal from '../components/ProductModifyModal';

interface ProductPageProps {}

export const productFormField = {
  name: 'Name',
  description: 'Description',
  price: 'Price',
  category: 'Category',
  image: 'Image',
};

const ProductPage: React.FunctionComponent<ProductPageProps> = (props) => {
  const [productInfo, setProductInfo] = useState<ProductInfo[] | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productDeleteSelected, setProductDeleteSelected] = useState<number | undefined>(0);
  const token = useRef(localStorage.getItem('token')).current || '';
  const navigate = useNavigate();

  const getProduct = useCallback(async () => {
    const res = await productApi.getAllProduct();
    if (res) setProductInfo(res.data);
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  const handleToggleModal = () => {
    setOpenCreateModal(true);
  };

  const handleEdit = (
    id: number | undefined,
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpenEditModal(true);
    navigate(`?edit-id=${id}`);
  };

  useEffect(() => {
    !openEditModal && navigate('/product');
  }, [openEditModal]);

  const handleDelete = (
    id: number | undefined,
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setProductDeleteSelected(id);
    setOpenDeleteModal(true);
  };

  const deleteProduct = useCallback(async (id) => {
    await productApi.deleteProduct(id);
    getProduct();
  }, []);

  return (
    <div className="container">
      <div className="product-content">
        <div className="product-content__header">
          <span>LIST PRODUCT</span>
        </div>

        <div className="product__button-container">
          <Button
            type={'primary'}
            onClick={handleToggleModal}
            danger
            size={'large'}
            className="product__create-btn"
          >
            Create Product
          </Button>
        </div>

        <div className="product__list-items">
          {productInfo
            ? productInfo.map((e, i) => (
                <ProductCard
                  actions={[
                    <EditOutlined onClick={(event) => handleEdit(e.id, event)} key="edit" />,
                    <DeleteOutlined onClick={(event) => handleDelete(e.id, event)} key="delete" />,
                  ]}
                  isEdit
                  info={e}
                  key={i}
                />
              ))
            : Array.from({ length: 6 }, () => Math.random()).map((e, i) => (
                <Skeleton key={i} active />
              ))}
        </div>

        <ProductModifyModal
          visible={openCreateModal}
          setVisible={setOpenCreateModal}
          getProduct={getProduct}
          isUpdate={false}
        />

        <ProductModifyModal
          visible={openEditModal}
          setVisible={setOpenEditModal}
          getProduct={getProduct}
          isUpdate={true}
        />

        <ModalComponent
          openModal={openDeleteModal}
          title={'Delete Product'}
          onOk={() => deleteProduct(productDeleteSelected)}
          setOpenModal={setOpenDeleteModal}
          description={'Do you want to delete this product'}
        />
      </div>
    </div>
  );
};

export default ProductPage;
