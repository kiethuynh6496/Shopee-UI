import { Button, Radio, RadioChangeEvent, Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { PlusIcon } from 'components/Icons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  checkoutActions,
  selectAddressIdChecked,
  selectIsModifyAddressStep,
} from '../checkoutSlice';
import { AddressResponseInfo } from 'models/address/addressResponse';
import { addressApi } from 'api/addressApi';
import { useTranslation } from 'react-i18next';

interface AddressListProps {}

const AddressList: React.FunctionComponent<AddressListProps> = (props) => {
  const [userAddress, setUserAddress] = useState<AddressResponseInfo[]>();
  const isModifyAddressStep = useAppSelector(selectIsModifyAddressStep);
  const addressIdChecked = useAppSelector(selectAddressIdChecked);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onChange = (e: RadioChangeEvent) => {
    dispatch(checkoutActions.setAddressIdChecked(e.target.value));
  };

  const getUserAddress = useCallback(async () => {
    const res = await addressApi.getAddress();
    if (res) {
      setUserAddress(res.data);
    }
  }, []);

  useEffect(() => {
    getUserAddress();
  }, []);

  useEffect(() => {
    !isModifyAddressStep && getUserAddress();
  }, [isModifyAddressStep]);

  const handleDeleteAddress = async (value: number) => {
    const res = await addressApi.deleteAddress(value);
    if (res) {
      setUserAddress(res.data);
    }
  };

  const handleCreateAddress = () => {
    dispatch(checkoutActions.setUpdateAddressSelected(false));
    dispatch(checkoutActions.setisModifyAddressStep(true));
  };

  return (
    <Radio.Group onChange={onChange} value={addressIdChecked} className="address-list">
      {userAddress && (
        <Space direction="vertical">
          {userAddress.map((e, i) => (
            <Radio key={i} value={e} className="address-card">
              <div className="address-card__info">
                <div className="address-card__general">
                  <span className="address-card__name">{e.nickName}</span>
                  <span className="address-card__name">{e.addressName}</span>
                  <span className="address-card__phone">{e.phone}</span>
                </div>
                <div className="address-card__option">
                  <Button type="link" onClick={() => handleDeleteAddress(e.id)}>
                    {t('cart.delete')}
                  </Button>
                </div>
              </div>
            </Radio>
          ))}
        </Space>
      )}

      <Button
        className={
          userAddress && userAddress.length > 0
            ? 'address__add-btn'
            : 'address__add-btn address__add-btn--empty'
        }
        onClick={handleCreateAddress}
      >
        <PlusIcon /> <span>{t('checkout.add_new')}</span>
      </Button>
    </Radio.Group>
  );
};

export default AddressList;
