import { Button, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { AddressResponseInfo } from 'models';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  checkoutActions,
  selectAddressIdChecked,
  selectIsModifyAddressStep,
  selectIsOpenAddressModal,
  selectUpdateAddressSelected,
} from '../checkoutSlice';
import AddressList from './AddressList';
import CreateAddressForm from './CreateAddressForm';
import { addressApi } from 'api/addressApi';
import { useTranslation } from 'react-i18next';

interface AddressModalProps {
  setUserAddress: (value: AddressResponseInfo) => void;
}

const AddressModal: React.FunctionComponent<AddressModalProps> = ({ setUserAddress }) => {
  const [loading, setLoading] = useState(false);
  const isOpenAddressModal = useSelector(selectIsOpenAddressModal);
  const isModifyAddressStep = useAppSelector(selectIsModifyAddressStep);
  const updateAddressSelected = useAppSelector(selectUpdateAddressSelected);
  const addressIdChecked = useAppSelector(selectAddressIdChecked);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleOk = async () => {
    if (addressIdChecked != null) {
      setLoading(true);
      const res = await addressApi.updateDefaultAddress(addressIdChecked.id).catch((error) => {
        setLoading(false);
      });
      if (res) {
        setUserAddress(res);
        setLoading(false);
        dispatch(checkoutActions.setIsOpenAddressModal(false));
      }
    }
    dispatch(checkoutActions.setIsOpenAddressModal(false));
  };

  const handleOpenAddressModal = (value: boolean) => {
    isModifyAddressStep
      ? dispatch(checkoutActions.setisModifyAddressStep(false))
      : dispatch(checkoutActions.setIsOpenAddressModal(value));
  };

  useEffect(() => {
    !isOpenAddressModal && dispatch(checkoutActions.setisModifyAddressStep(false));
  }, [isOpenAddressModal]);

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
            {isModifyAddressStep ? t('checkout.back') : t('checkout.cancel')}
          </Button>,
          <Button key="submit" danger type="primary" loading={loading} onClick={handleOk}>
            {t('checkout.confirm')}
          </Button>,
        ]
      }
    >
      <div className="address-wrapper">
        <p className="address-title">
          {isModifyAddressStep ? (
            !updateAddressSelected ? (
              <span>{t('checkout.add_new')}</span>
            ) : (
              <span>{t('checkout.update_address')}</span>
            )
          ) : (
            <span>{t('checkout.my_addresses')}</span>
          )}
        </p>
      </div>

      {isModifyAddressStep ? <CreateAddressForm /> : <AddressList />}
    </Modal>
  );
};

export default AddressModal;
