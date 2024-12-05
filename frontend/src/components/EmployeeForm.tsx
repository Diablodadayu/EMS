import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
// import moment from "moment";
import { Employee } from "../types";
import dayjs from "dayjs";
const { Option } = Select;
const EditForm = ({
  onSubmit,
  data,
}: {
  onSubmit: (form: any) => void;
  data?: Employee;
}) => {
  return (
    <Form initialValues={data || {}} onFinish={onSubmit}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please select your title!" }]}
      >
        <Select placeholder="Select a title">
          {["Employee", "Manager", "Director", "VP"].map((role) => (
            <Option value={role} key={role}>
              {role}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="status">
        <Select>
          {["Inactive", "Active"].map((role, idx) => (
            <Option value={idx} key={idx}>
              {role}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="department"
        rules={[{ required: true, message: "Please input your department!" }]}
      >
        <Input placeholder="Department" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          size="large"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
const CreateForm = ({ onSubmit }: { onSubmit: (form: any) => void }) => {
  return (
    <Form onFinish={onSubmit}>
      <Form.Item
        name="firstName"
        rules={[
          { required: true, message: "Please input your firstname!" },
          { type: "string", min: 1, max: 64 },
        ]}
      >
        <Input placeholder="Firstname" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          { required: true, message: "Please input your lastname!" },
          { type: "string", min: 1, max: 64 },
        ]}
      >
        <Input placeholder="Lastname" />
      </Form.Item>
      <Form.Item
        name="dateOfBirth"
        rules={[
          { required: true, message: "Please select your date of birth!" },
        ]}
      >
        <DatePicker
          placeholder="Date of Birth"
          style={{ width: "100%" }}
          disabledDate={(current) => current.isAfter(dayjs())}
        />
      </Form.Item>
      <Form.Item
        name="dateOfJoining"
        rules={[
          { required: true, message: "Please input your date of joining!" },
        ]}
      >
        <DatePicker placeholder="Date of joining" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please select your title!" }]}
      >
        <Select placeholder="Select a title">
          {["Employee", "Manager", "Director", "VP"].map((role) => (
            <Option value={role} key={role}>
              {role}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="department"
        rules={[{ required: true, message: "Please input your department!" }]}
      >
        <Input placeholder="Department" />
      </Form.Item>
      <Form.Item
        name="type"
        rules={[
          { required: true, message: "Please select your employee type!" },
        ]}
      >
        <Select placeholder="Select a employee type">
          {["Fulltime", "Parttime", "Contract", "Seasonal"].map((role) => (
            <Option value={role} key={role}>
              {role}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          size="large"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export const EmployeeEditForm = ({
  onSubmit,
  data,
}: {
  onSubmit: any;
  data?: Employee;
}) => {
  return (
    <>
      <EditForm data={data} onSubmit={onSubmit} />
    </>
  );
};

export const EmployeeCreateForm = ({ onSubmit }: { onSubmit: any }) => {
  return (
    <>
      <CreateForm onSubmit={onSubmit} />
    </>
  );
};
