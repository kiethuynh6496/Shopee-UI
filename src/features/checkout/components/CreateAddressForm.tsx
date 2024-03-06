import { Button, Form, Input, Tabs } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { locationApi } from 'api/locationApi';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { addressApi } from 'api/addressApi';
import { AddressRequest, AddressResponse } from 'models';

interface CreateAddressFormProps {}

const CreateAddressForm: React.FunctionComponent<CreateAddressFormProps> = (props) => {
  const { TabPane } = Tabs;
  const [activeKey, setActiveKey] = useState<string>('1');
  const [locationData, setLocationData] = useState<any>(null);
  const [province, setProvince] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [addressData, setAddressData] = useState<AddressResponse>();
  const token = localStorage.getItem('token') || '';
  const [form] = useForm();
  const dispatch = useAppDispatch();

  const handleAddress = (data: any) => {

  };

  const getLocationData = useCallback(async () => {
    try {
      const res = await locationApi.getVNLocation();
      if (res) setLocationData(res.data);
    } catch (error) {}
  }, []);

  const updateAddress = useCallback(async (id: number, data: AddressRequest) => {
    await addressApi.updateAddress(id, data);
  }, []);

  const createAddress = useCallback(async (data) => {
    await addressApi.createAddress(data, token);
  }, []);

  const getAddressData = useCallback(async (id) => {
    const res = await addressApi.getAddress(id);
    res && setAddressData(res);
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
        <Form.Item name={'userName'} rules={[{ required: true }]}>
          <Input placeholder="Họ và Tên" />
        </Form.Item>

        <Form.Item name={'phoneNumber'} rules={[{ required: true }]}>
          <Input placeholder="Số điện thoại" />
        </Form.Item>
      </div>

      <div className="address-form__field">
        <Form.Item name={'address'} rules={[{ required: true }]}>
          <Input placeholder={'Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã'} allowClear />
        </Form.Item>
      </div>

      <Tabs
        defaultActiveKey="1"
        activeKey={activeKey}
        onChange={(val) => setActiveKey(val)}
        className="address-form__tabs"
        centered
      >
        <TabPane tab="Tỉnh/ Thành phố" key="1" className="address-form__tab">
          {locationData &&
            locationData.map((e: any) => (
              <li
                key={e.code}
                onClick={() => {
                  setProvince(e.name);
                  setActiveKey('2');
                  form.setFieldsValue({ address: e.name });
                }}
              >
                {e.name}
              </li>
            ))}
        </TabPane>

        <TabPane tab="Quận/Huyện" key="2" disabled={!province}>
          {locationData &&
            locationData
              .filter((val: any) => val.name === province)
              .map((e: any) =>
                e.districts.map((i: any) => (
                  <li
                    onClick={() => {
                      setDistrict(i.name);
                      setActiveKey('3');
                      form.setFieldsValue({ address: `${province}, ${i.name}` });
                    }}
                    key={i.code}
                  >
                    {i.name}
                  </li>
                ))
              )}
        </TabPane>

        <TabPane tab="Phường/Xã" key="3" disabled={!district}>
          {locationData &&
            locationData
              .filter((val: any) => val.name === province)
              .map((e: any) =>
                e.districts
                  .filter((val: any) => val.name === district)
                  .map((i: any) =>
                    i.wards.map((j: any) => (
                      <li
                        onClick={() => {
                          setActiveKey('1');
                          form.setFieldsValue({
                            address: `${province}, ${district}, ${j.name}`,
                          });
                        }}
                        key={j.code}
                      >
                        {j.name}
                      </li>
                    ))
                  )
              )}
        </TabPane>
      </Tabs>

      <div className="address-form__field">
        <Form.Item name={'detailAddress'} rules={[{ required: true }]}>
          <Input placeholder="Địa chỉ cụ thể" />
        </Form.Item>
      </div>

      <div className="address-form__options">
        <Button
          danger
          ghost
        >
          Trở Lại
        </Button>

        <Button danger type="primary" htmlType="submit">
          Xác nhận
        </Button>
      </div>
    </Form>
  );
};

export default CreateAddressForm;
