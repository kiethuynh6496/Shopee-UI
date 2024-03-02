import { Button, Modal } from 'antd';
import orderApi from 'api/orderApi';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { OrderAddressRequest, OrderGetInformation } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  checkoutActions,
  selectAddressIdChecked,
  selectIsModifyAddressStep,
  selectIsOpenAddressModal,
  selectUpdateAddressSelected,
} from '../checkoutSlice';
import AddressList from './AddressList';
import CreateAddressForm from './CreateAddressForm';

interface AddressModalProps {
  setOrderData: (value: OrderGetInformation) => void;
}

const AddressModal: React.FunctionComponent<AddressModalProps> = ({ setOrderData }) => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const isOpenAddressModal = useSelector(selectIsOpenAddressModal);
  const isModifyAddressStep = useAppSelector(selectIsModifyAddressStep);
  const addressIdChecked = useAppSelector(selectAddressIdChecked);
  const updateAddressSelected = useAppSelector(selectUpdateAddressSelected);
  const token = localStorage.getItem('token') || '';
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleOk = () => {
    setLoading(true);
    orderId && updateOrderAddress(token, orderId, { addressId: addressIdChecked });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (location.search) {
      const orderId = queryParams.get('state');
      if (orderId) {
        setOrderId(Number(orderId));
      }
    }
  }, []);

  const handleOpenAddressModal = (value: boolean) => {
    isModifyAddressStep
      ? dispatch(checkoutActions.setisModifyAddressStep(false))
      : dispatch(checkoutActions.setIsOpenAddressModal(value));
  };

  useEffect(() => {
    !isOpenAddressModal && dispatch(checkoutActions.setisModifyAddressStep(false));
  }, [isOpenAddressModal]);

  const updateOrderAddress = useCallback(
    async (token: string, id: number, data: OrderAddressRequest) => {
      const res = await orderApi.updateOrderAddress(token, id, data);
      if (res) {
        setLoading(false);
        setOrderData(res);
        dispatch(checkoutActions.setIsOpenAddressModal(false));
      }
    },
    []
  );

  return (
    <Modal
      visible={isOpenAddressModal}
      centered
      onOk={() => handleOpenAddressModal(false)}
      onCancel={() => dispatch(checkoutActions.setIsOpenAddressModal(false))}
      className={!isModifyAddressStep ? 'address-modal' : 'address-modal address-modal--edit'}
      footer={
        !isModifyAddressStep && [
          <Button key="back" danger ghost onClick={() => handleOpenAddressModal(false)}>
            {isModifyAddressStep ? 'Trở Lại' : 'Hủy'}
          </Button>,
          <Button key="submit" danger type="primary" loading={loading} onClick={handleOk}>
            Xác nhận
          </Button>,
        ]
      }
    >
      <div className="address-wrapper">
        <p className="address-title">
          {isModifyAddressStep ? (
            !updateAddressSelected ? (
              <span>Địa Chỉ Mới</span>
            ) : (
              <span>Cập nhật địa chỉ</span>
            )
          ) : (
            <span>Địa Chỉ Của Tôi</span>
          )}
        </p>
      </div>

      {isModifyAddressStep ? <CreateAddressForm /> : <AddressList />}
    </Modal>
  );
};

export default AddressModal;
