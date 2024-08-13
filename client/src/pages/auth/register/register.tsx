import { Button, Form, Input } from "antd";
import WelcomeContent from "../common/welcome-content";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const onFinish = (values: never) => {
    console.log(values);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1 lg:flex hidden">
        <WelcomeContent />
      </div>
      <div className="h-screen flex justify-center items-center">
        <Form
          className="flex flex-col gap-5 w-96"
          layout="vertical"
          onFinish={onFinish}
        >
          <h1 className="text-2xl font-bold text-gray-600">
            Register your account
          </h1>
          <Form.Item
            name="name"
            label="Name"
            required
            rules={[{ required: true }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            required
            rules={[{ required: true }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            required
            rules={[{ required: true }]}
          >
            <Input placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>

          <Link to="/login">Already have an account? Login</Link>
        </Form>{" "}
      </div>
    </div>
  );
};

export default RegisterPage;
