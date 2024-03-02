import { Button, Radio, RadioChangeEvent, Space } from 'antd';
import { addressApi } from 'api/addressApi';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { PlusIcon } from 'components/Icons';
import { AddressResponse } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import {
  checkoutActions,
  selectAddressIdChecked,
  selectIsModifyAddressStep,
  selectIsOpenAddressModal,
} from '../checkoutSlice';

interface AddressListProps {}

const AddressList: React.FunctionComponent<AddressListProps> = (props) => {
  const token = localStorage.getItem('token') || '';
  const [addressesData, setAddressesData] = useState<AddressResponse[] | null>(null);
  const isOpenAddressModal = useAppSelector(selectIsOpenAddressModal);
  const isModifyAddressStep = useAppSelector(selectIsModifyAddressStep);
  const addressIdChecked = useAppSelector(selectAddressIdChecked);
  const dispatch = useAppDispatch();

  const onChange = (e: RadioChangeEvent) => {
    dispatch(checkoutActions.setAddressIdChecked(e.target.value));
  };

  const getAddressesData = useCallback(async () => {
    try {
      const res = await addressApi.getAddresses(token);
      if (res) setAddressesData(res);
    } catch (error) {}
  }, []);

  useEffect(() => {
    isOpenAddressModal && getAddressesData();
  }, [isOpenAddressModal]);

  useEffect(() => {
    !isModifyAddressStep && getAddressesData();
  }, [isModifyAddressStep]);

  const handleUpdateAddress = (value: number) => {
    dispatch(checkoutActions.setUpdateAddressSelected(value));
    dispatch(checkoutActions.setisModifyAddressStep(true));
  };

  const handleCreateAddress = () => {
    dispatch(checkoutActions.setUpdateAddressSelected(false));
    dispatch(checkoutActions.setisModifyAddressStep(true));
  };

  return (
    <Radio.Group onChange={onChange} value={addressIdChecked} className="address-list">
      {addressesData && addressesData.length > 0 && (
        <Space direction="vertical">
          {addressesData.map((e, i) => (
            <Radio key={i} value={e.id} className="address-card">
              <div className="address-card__info">
                <div className="address-card__general">
                  <span className="address-card__name">{e.userName}</span>

                  <span className="address-card__phone">{e.phoneNumber}</span>
                </div>

                <p className="address-card__description">{`${e.detailAddress}, ${e.address}`}</p>
              </div>

              <div className="address-card__option">
                <Button type="link" onClick={() => handleUpdateAddress(e.id)}>
                  Cập nhật
                </Button>
              </div>
            </Radio>
          ))}
        </Space>
      )}

      <Button
        className={
          addressesData && addressesData.length > 0
            ? 'address__add-btn'
            : 'address__add-btn address__add-btn--empty'
        }
        onClick={handleCreateAddress}
      >
        <PlusIcon /> <span>Thêm Địa Chỉ Mới</span>
      </Button>
    </Radio.Group>
  );
};

export default AddressList;
