import { Button, Form, Input, message } from "antd";
import WelcomeContent from "../common/welcome-content";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../api-services/user-service";
import Cookies from "js-cookie";
import { useState } from "react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: never) => {
    try { 
      setLoading(true);
      const response = await loginUser(values);
      console.log(response.data)
      message.success(response.message);
      Cookies.set("token", response.token);
      navigate("/");
    } catch (error: any) {
      message.error(error.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
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
            Login your account
          </h1>

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
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Login{" "}
          </Button>

          <Link to="/register">Don't have an account? Register</Link>
        </Form>{" "}
      </div>
    </div>
  );
};

export default LoginPage;
