// import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EmployeeEditForm } from "../components/EmployeeForm";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Employee } from "../types";
import { notification } from "antd";
const EDIT_EMPLOYEE = gql`
  mutation editEmployee(
    $id: String!
    $department: String!
    $title: String!
    $status: Int!
  ) {
    editEmployee(
      id: $id
      input: { department: $department, title: $title, status: $status }
    ) {
      id
    }
  }
`;
const EmployeeEdit = () => {
  let { id } = useParams();
  const {
    state: { from },
  } = useLocation();

  const navigate = useNavigate();
  const [editEmployee] = useMutation(EDIT_EMPLOYEE, {
    onCompleted: () => {
      notification.success({
        description: "Success",
        message: "Success",
      });
      if (from) {
        navigate(from);
      } else {
        navigate("/", { replace: true });
      }
    },
    onError: (error) => {
      notification.error({
        description: error.message,
        message: "Failed",
      });
    },
  });
  const GET_EMPLOYEE = gql`
    query GetEmployee($id: String!) {
      getEmployee(id: $id) {
        id
        firstName
        lastName
        dateOfBirth
        dateOfJoining
        department
        type
        status
        title
      }
    }
  `;
  const { data, loading } = useQuery<{ getEmployee: Employee }>(GET_EMPLOYEE, {
    variables: { id },
  });
  return (
    <div className="edit-form">
      <h1>Edit Employee</h1>
      {!loading && (
        <EmployeeEditForm
          data={data?.getEmployee}
          onSubmit={({ department, title, status }: any) => {
            editEmployee({
              variables: {
                id,
                department,
                title,
                status,
              },
            });
            navigate("/", { replace: true });
          }}
        />
      )}
    </div>
  );
};
export default EmployeeEdit;
