import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import paymentApi from 'api/paymentApi';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkoutActions, selectIsConfirmModal } from '../checkoutSlice';

interface ConfirmModalProps {
  orderId: number;
}

const ConfirmModal: React.FunctionComponent<ConfirmModalProps> = ({ orderId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem('token') || '';
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const isConfirmModal = useAppSelector(selectIsConfirmModal);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    setLoading(true);
    handlePayment(orderId);
  };

  const handlePayment = useCallback(async (id) => {
    try {
      const res = await paymentApi.payment(token, id);

      if (res.status === 'SUCCESS') {
        setLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {}
  }, []);

  const handleNav = () => {
    handleOpenModal(false);
    navigate('/');
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
              <Button key="back" danger type="primary" onClick={handleNav}>
                Continue Browsing
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
