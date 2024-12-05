import { useParams } from "react-router-dom";
import { Employee } from "../types";
import { useQuery, gql } from "@apollo/client";
import { captalize, dateFormate } from "../../utils";
import dayjs from "dayjs";

const GET_EMPLOYEE = gql`
  query GetEmployee($id: String!) {
    getEmployee(id: $id) {
      id
      dateOfBirth
      firstName
      lastName
      dateOfJoining
      department
      type
      status
      title
    }
  }
`;
export const EmployeeDetail = () => {
  let { id } = useParams();
  const { data } = useQuery<{ getEmployee: Employee }>(GET_EMPLOYEE, {
    fetchPolicy: "no-cache",
    variables: { id },
  });
  const layout = [
    ["firstName", "lastName"],
    [
      {
        key: "dateOfBirth",
        render: dateFormate,
      },
      {
        key: "dateOfJoining",
        render: dateFormate,
      },
    ],
    ["title", "department"],
    [
      "type",
      {
        key: "status",
        render: (val: number) => (val == 1 ? "Active" : "Inactive"),
      },
    ],
    [
      {
        key: "Retire status",
        render: (_: any, { dateOfBirth }: any) => {
          const dob = dayjs(parseInt(dateOfBirth));
          const today = dayjs();
          const sixtyFiveYearsLater = dob.add(65, "year");
          if (sixtyFiveYearsLater.isBefore(today)) {
            return "Retired";
          } else {
            const years = sixtyFiveYearsLater.diff(today, "year");
            const months = sixtyFiveYearsLater.diff(
              today.add(years, "year"),
              "month"
            );
            const days = sixtyFiveYearsLater.diff(
              today.add(years, "year").add(months, "month"),
              "day"
            );
            return `You retire date is ${years} years ${months} months ${days} days from now.`;
          }
        },
      },
    ],
  ];

  return (
    <div>
      <h1>Employee Detial</h1>
      <div
        style={{ padding: "24px", background: "#fff", borderRadius: "12px" }}
      >
        {layout.map((row) => (
          <div
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "16px",
              marginBottom: "24px",
            }}
          >
            {row.map((obj: any) => {
              const key = typeof obj == "object" ? obj.key : obj;
              const render =
                typeof obj == "object" ? obj.render : (val: any) => val;
              return (
                <div style={{ width: "50%" }}>
                  <span>{`${captalize(key)}: `}</span>
                  <span style={{ color: "#aaa" }}>
                    {render(
                      data ? (data as any).getEmployee[key] : "",
                      data?.getEmployee || {}
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
