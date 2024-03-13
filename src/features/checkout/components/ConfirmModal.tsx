import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkoutActions, selectIsConfirmModal } from '../checkoutSlice';
import { AddressResponseInfo } from 'models/address/addressResponse';
import orderApi from 'api/orderApi';
import paymentApi from 'api/paymentApi';

interface ConfirmModalProps {
  userAddress: AddressResponseInfo | undefined;
}

const ConfirmModal: React.FunctionComponent<ConfirmModalProps> = ({ userAddress }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const isConfirmModal = useAppSelector(selectIsConfirmModal);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    setLoading(true);
    handleOrder(userAddress);
  };

  const handleOrder = useCallback(async (userAddress) => {
    try {
      const res = await orderApi.createOrder(userAddress);
      if (res) {
        setLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {}
  }, []);

  const handlePayment = async () => {
    try {
      const res = await paymentApi.createMoMoPayment();
      if (res) {
        console.log(res);
        setLoading(false);
        window.open(res.data.paymentMomoURL, '_blank');
        navigate('/');
        handleOpenModal(false);
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (value: boolean) => {
    dispatch(checkoutActions.setIsConfirmModal(value));
  };

  return (
    <Modal
      visible={isConfirmModal}
      centered
      onOk={() => handleOpenModal(false)}
      onCancel={() => handleOpenModal(false)}
      className={`confirm-modal ${isSuccess && 'confirm-modal--success'}`}
      footer={
        !isSuccess
          ? [
              <Button key="back" danger ghost onClick={() => handleOpenModal(false)}>
                Hủy
              </Button>,
              <Button key="submit" danger type="primary" loading={loading} onClick={handleSubmit}>
                Xác nhận
              </Button>,
            ]
          : [
              <Button key="back" danger type="primary" onClick={handlePayment}>
                Thanh toán
              </Button>,
            ]
      }
    >
      <div className="confirm-modal__description">
        {!isSuccess ? (
          <span>Bạn đã xác nhận mua hàng?</span>
        ) : (
          <>
            <CheckCircleFilled style={{ color: '#00F295' }} /> <span>Checkout Success</span>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ConfirmModal;
