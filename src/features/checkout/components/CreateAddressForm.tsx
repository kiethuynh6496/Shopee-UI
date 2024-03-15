import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { checkoutActions, selectUpdateAddressSelected } from '../checkoutSlice';
import { AddressResponse } from 'models';
import { addressApi } from 'api/addressApi';
import { useTranslation } from 'react-i18next';

interface CreateAddressFormProps {}

const CreateAddressForm: React.FunctionComponent<CreateAddressFormProps> = (props) => {
  const updateAddressSelected = useAppSelector(selectUpdateAddressSelected);
  const [addressData, setAddressData] = useState<AddressResponse>();
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleAddress = (data: any) => {
    if (!updateAddressSelected) {
      createAddress(data).then(() => {
        dispatch(checkoutActions.setisModifyAddressStep(false));
      });
    }
  };

  useEffect(() => {
    if (updateAddressSelected) {
      getAddressData();
    }
  }, []);

  const createAddress = useCallback(async (data) => {
    await addressApi.createAddress(data);
  }, []);

  const getAddressData = useCallback(async () => {
    const res = await addressApi.getAddress();
    if (res.statusCode === 200) {
      setAddressData(res);
    }
  }, []);

  useEffect(() => {
    form.setFieldsValue(addressData);

    return () => {
      form.resetFields();
    };
  }, [addressData]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddress}
      autoComplete="off"
      className="address-form"
    >
      <div className="address-form__field">
        <Form.Item name={'nickName'} rules={[{ required: true }]}>
          <Input placeholder={t('checkout.full_name')} />
        </Form.Item>

        <Form.Item name={'phone'} rules={[{ required: true }]}>
          <Input placeholder={t('checkout.phone')} />
        </Form.Item>
      </div>

      <div className="address-form__field">
        <Form.Item name={'addressName'} rules={[{ required: true }]}>
          <Input placeholder={t('checkout.address')} />
        </Form.Item>
      </div>

      <div className="address-form__options">
        <Button
          danger
          ghost
          onClick={() => dispatch(checkoutActions.setisModifyAddressStep(false))}
        >
          {t('checkout.back')}
        </Button>

        <Button danger type="primary" htmlType="submit">
          {t('checkout.confirm')}
        </Button>
      </div>
    </Form>
  );
};

export default CreateAddressForm;
