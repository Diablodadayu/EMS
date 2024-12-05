// import React from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeCreateForm } from "../components/EmployeeForm";
import { gql, useMutation } from "@apollo/client";
import { notification } from "antd";
const CREATE_EMPLOYEE = gql`
  mutation createEmployee(
    $firstName: String!
    $lastName: String!
    $dateOfBirth: String!
    $dateOfJoining: String!
    $department: String!
    $type: String!
    $title: String!
  ) {
    createEmployee(
      input: {
        firstName: $firstName
        lastName: $lastName
        dateOfBirth: $dateOfBirth
        dateOfJoining: $dateOfJoining
        department: $department
        type: $type
        title: $title
      }
    ) {
      id
    }
  }
`;

export const EmployeeCreate = () => {
  const navigate = useNavigate();
  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    onCompleted: () => {
      notification.success({
        description: "Success",
        message: "Success",
      });
      navigate("/", { replace: true });
    },
    onError: (error) => {
      notification.error({
        description: error.message,
        message: "Failed",
      });
    },
  });
  return (
    <div className="create-form">
      <h1>Create Employee</h1>
      <EmployeeCreateForm
        onSubmit={({
          firstName,
          lastName,
          dateOfBirth,
          dateOfJoining,
          department,
          type,
          title,
        }: any) => {
          createEmployee({
            variables: {
              firstName,
              lastName,
              dateOfBirth,
              dateOfJoining,
              department,
              type,
              title,
            },
          });
        }}
      />
    </div>
  );
};
