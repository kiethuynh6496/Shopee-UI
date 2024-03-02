import { Button, Form, Input } from 'antd';
import { AuthInformation } from 'models';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useTranslation } from 'react-i18next';

export interface AuthFormProps {
  initialValue: AuthInformation;
  onSubmit: (formValues: AuthInformation) => void;
  onFail?: (errorInfo: ValidateErrorEntity<AuthInformation>) => void;
  submitType?: string;
  isLoading: boolean;
}

export const AuthForm = ({
  initialValue,
  onSubmit,
  onFail,
  submitType,
  isLoading,
}: AuthFormProps) => {
  const { t } = useTranslation();

  return (
    <Form
      name="auth"
      initialValues={initialValue}
      layout="vertical"
      onFinish={onSubmit}
      onFinishFailed={onFail}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: t('auth.input_email_alert') }]}
        className="auth__input-container"
      >
        <Input className="auth__input" placeholder={t('auth.placeholder1')} disabled={isLoading} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: t('auth.input_pass_alert') }]}
        className="auth__input-container"
      >
        <Input.Password
          className="auth__input"
          placeholder={t('auth.placeholder2')}
          disabled={isLoading}
        />
      </Form.Item>

      <Form.Item>
        <Button
          className="auth__submit"
          type="primary"
          block
          danger
          htmlType="submit"
          loading={isLoading}
        >
          {submitType || 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  );
};
