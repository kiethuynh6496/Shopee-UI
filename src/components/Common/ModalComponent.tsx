import { Modal } from 'antd';
import React, { ReactNode } from 'react';

interface ModalComponentProps {
  openModal: boolean;
  title?: string;
  onOk: () => void;
  onCancel?: () => void;
  setOpenModal: (value: boolean) => void;
  description?: string | ReactNode;
  noFooter?: true;
}

export const ModalComponent: React.FunctionComponent<ModalComponentProps> = ({
  openModal,
  title,
  onOk,
  onCancel,
  setOpenModal,
  description,
  noFooter,
}) => {
  const handleOk = () => {
    onOk();
    setOpenModal(false);
  };
  const handleCancel = () => {
    onCancel && onCancel();
    setOpenModal(false);
  };
  return (
    <>
      {!noFooter ? (
        <Modal
          centered
          title={title && title}
          visible={openModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {typeof description == 'string' ? <p>{description}</p> : description}
        </Modal>
      ) : (
        <Modal
          footer={null}
          centered
          title={title && title}
          visible={openModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {typeof description == 'string' ? <p>{description}</p> : description}
        </Modal>
      )}
    </>
  );
};
