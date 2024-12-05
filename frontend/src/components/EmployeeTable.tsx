import { Table, notification, Modal } from "antd";
import { Employee } from "../types";
import { gql, useMutation } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { captalize, dateFormate } from "../../utils";
import dayjs from "dayjs";

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($deleteEmployeeId: String!) {
    deleteEmployee(id: $deleteEmployeeId)
  }
`;
export const EmployeeTable = ({
  data,
  update,
}: {
  data: Employee[];
  update: Function;
}) => {
  const location = useLocation();

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      notification.success({
        description: "Success",
        message: "Success",
      });
      update();
    },
    onError: (error) => {
      notification.error({
        description: error.message,
        message: "Failed",
      });
    },
  });
  const columns = [
    "firstName",
    "lastName",
    "dateOfBirth",
    "dateOfJoining",
    "title",
    "department",
    "type",
    "status",
    "actions",
  ].map((key) => ({
    dataIndex: key,
    key,
    title: {}[key] || captalize(key),
    render: {
      dateOfBirth: dateFormate,
      dateOfJoining: dateFormate,
      status: (val: number) => <div>{val == 1 ? "Active" : "Inactive"}</div>,
      actions: (_: any, { id, dateOfBirth, status }: any) => (
        <div className="list-action">
          <Link to={`/employee/${id}`}>Detail</Link>
          <a
            onClick={() => {
              const age = dayjs().diff(
                dayjs(dateOfBirth, "YYYY-MM-DD"),
                "year"
              );
              if (status === 1) {
                notification.error({
                  message: "Failed",
                  description: "Can't delete active employee!",
                });
                return;
              }
              console.log(age);
              Modal.warning({
                closable: true,
                onOk: () => {
                  deleteEmployee({ variables: { deleteEmployeeId: id } });
                },
                okText: "Yes",
                title: "Do you want to delete this employee?",
              });
            }}
          >
            Delete
          </a>
          <Link to={`/employee/${id}/edit`} state={{ from: location }}>
            Edit
          </Link>
        </div>
      ),
    }[key],
  }));
  return <Table dataSource={data} columns={columns} rowKey={"id"} />;
};
