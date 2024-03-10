import { Button, Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import imageApi from 'api/imageApi';
import productApi from 'api/productApi';
import warrantyIcon from 'assets/images/warranty_icon.png';
import { CoinIcon } from 'components/Icons/CoinIcon';
import { ProductInfo } from 'models/product/productInfo';
import queryString from 'query-string';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { productFormField } from '../pages/ProductPage';
import UploadComponent from './UploadComponent';

interface IProductModifyModalProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
  isUpdate?: boolean;
  getProduct: () => void;
}

const ProductModifyModal: React.FunctionComponent<IProductModifyModalProps> = ({
  visible,
  setVisible,
  isUpdate,
  getProduct,
}) => {
  const token = useRef(localStorage.getItem('token')).current || '';
  const [form] = useForm();
  const location = useLocation();
  const [productUpdateId, setProductUpdateId] = useState<number | null>(null);
  const [productUpdateData, setProductUpdateData] = useState<ProductInfo>();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleCreate = (data: ProductInfo) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file.originFileObj);
    });
    formData.append('upload_preset', 'mfs2nd1f');

    createProduct(data, formData);
  };

  useEffect(() => {
    visible &&
      isUpdate &&
      location.search &&
      setProductUpdateId(Number(queryString.parse(location.search)['edit-id']));
  }, [visible]);

  useEffect(() => {
    productUpdateId && getUpdateData(productUpdateId);
  }, [visible, productUpdateId]);

  const getUpdateData = useCallback(async (id: number) => {
    const res = await productApi.getProduct(id);
    if (res) {
      setProductUpdateData(res.data[0]);
    }
  }, []);

  const handleUpdate = (data: ProductInfo) => {
    updateProduct(productUpdateData, data);
  };

  const createProduct = useCallback(async (data: ProductInfo, formData) => {
    imageApi.uploadImage(formData).then(async (response) => {
      // const res = await productApi.createProduct(token, {
      //   ...data,
      //   publicIdCloudary: response.data.secure_url,
      // });

      // if (res) {
      //   setVisible(false);
      //   getProduct();
      // }

      form.resetFields();
    });
  }, []);

  const updateProduct = useCallback(async (productUpdateData, data: ProductInfo) => {
    // await productApi.updateProduct(token, productUpdateData.id, {
    //   ...data,
    //   publicIdCloudary: productUpdateData?.publicIdCloudary,
    // });

    setVisible(false);
    getProduct();
  }, []);

  const cloneUpdateData = () => {
    let newData = { ...productUpdateData };
    // delete newData.id;
    return newData;
  };

  const handleFileChange = (info: any) => {
    setFileList(info.fileList);
  };

  useEffect(() => {
    if (!visible) {
      setFileList([]);
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    visible && isUpdate && productUpdateData && form.setFieldsValue(cloneUpdateData());
  }, [visible, isUpdate, productUpdateData]);

  return (
    <Modal
      visible={visible}
      footer={null}
      centered
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      className="product__modal"
    >
      <Form
        form={form}
        name="product"
        layout="vertical"
        onFinish={(data) => (isUpdate ? handleUpdate(data) : handleCreate(data))}
        autoComplete="off"
        className="product__form"
      >
        <div className="container">
          <div className="product-detail">
            <div className="product-detail__container">
              <div className="product-detail__left-side">
                <div className="product-detail__img-container">
                  <Form.Item name="image">
                    <UploadComponent onChange={handleFileChange} />
                  </Form.Item>
                </div>
              </div>

              <div className="product-detail__right-side">
                <div className="product-detail__header-container">
                  <div className="product-detail__header">
                    <Form.Item
                      name={Object.keys(productFormField)[0]}
                      rules={[
                        { required: true, message: `Product ${productFormField.name} is required` },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>

                <div className="product-detail__price">
                  <CoinIcon />{' '}
                  <Form.Item
                    name={Object.keys(productFormField)[2]}
                    rules={[{ required: true, message: `${productFormField.price} is required` }]}
                  >
                    <Input type="number" />
                  </Form.Item>
                </div>

                <div className="product-detail__warranty">
                  <img src={warrantyIcon} alt="warranty icon" />
                  <span>Shopee Đảm Bảo</span>
                  <span>3 Ngày Trả Hàng / Hoàn Tiền</span>
                </div>
              </div>
            </div>

            <div className="product-detail__container column">
              <div className="product-detail__content">
                <h2 className="product-content__header">CHI TIẾT SẢN PHẨM</h2>
                <div className="product-content__description">
                  <div className="product-category">
                    <p className="product__category-item">
                      <span>Danh Mục</span>
                      <span>
                        <Form.Item
                          name={Object.keys(productFormField)[3]}
                          rules={[
                            {
                              required: true,
                              message: `${productFormField.category} is required`,
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="product-detail__content">
                <h2 className="product-content__header">MÔ TẢ SẢN PHẨM</h2>
                <div className="product-content__description">
                  <Form.Item
                    name={Object.keys(productFormField)[1]}
                    rules={[
                      {
                        required: true,
                        message: `${productFormField.description} is required`,
                      },
                    ]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </div>
              </div>

              <Form.Item>
                <Button
                  className="product__submit-btn"
                  type="primary"
                  size={'large'}
                  block
                  danger
                  htmlType="submit"
                >
                  Create
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductModifyModal;
