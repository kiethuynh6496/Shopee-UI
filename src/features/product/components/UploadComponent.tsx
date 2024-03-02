import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import { getBase64 } from 'utils';

interface UploadComponentProps {
  onChange: Function;
}

const UploadComponent: React.FunctionComponent<UploadComponentProps> = ({ onChange }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      onChange(info);
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const dummyRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  return (
    <Upload
      name="image"
      listType="picture-card"
      showUploadList={false}
      // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
      customRequest={dummyRequest}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};

export default UploadComponent;
