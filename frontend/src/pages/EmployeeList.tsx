import { useMemo, useState } from "react";
import { Employee } from "../types";
import { EmployeeSearch } from "../components/EmployeeSearch";
import { EmployeeTable } from "../components/EmployeeTable";
import { useQuery, gql } from "@apollo/client";
import { Tag, Flex, Radio } from "antd";
import { useSearchParams } from "react-router-dom";
const tagsData = ["All", "Fulltime", "Parttime", "Contract", "Seasonal"];

const GET_EMPLOYEES = gql`
  query GetEmployees($type: String, $upcomingRetire: Boolean) {
    list: getEmployees(type: $type, upcomingRetire: $upcomingRetire) {
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

export const EmployeeDirectory = () => {
  const [query, setQuery] = useState<string>("");
  let [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get("type");
  const currentRetireType = searchParams.get("retireType");
  const { data, refetch } = useQuery<{ list: Employee[] }>(GET_EMPLOYEES, {
    fetchPolicy: "no-cache",
    variables: {
      type: currentType == "All" ? undefined : currentType,
      upcomingRetire: currentRetireType === "Upcoming" ? true : false,
    },
  });

  const filteredData = useMemo(() => {
    return query == ""
      ? data?.list
      : data?.list.filter(({ firstName }) => firstName.includes(query));
  }, [data, query]);

  return (
    <div>
      <h1>Employee Management System</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <Flex gap="4px 4px" wrap="wrap" align="center">
          <Radio.Group
            style={{ marginRight: 8 }}
            value={currentRetireType || "All"}
            onChange={(e) => {
              setSearchParams((params) => {
                params.set("retireType", e.target.value);
                return params;
              });
            }}
          >
            <Radio.Button value="All">All</Radio.Button>
            <Radio.Button value="Upcoming">Upcoming Retirement</Radio.Button>
          </Radio.Group>
          <span>Types: </span>
          {tagsData.map<React.ReactNode>((tag) => (
            <Tag.CheckableTag
              key={tag}
              checked={(currentType || "All") == tag}
              onChange={() => {
                setSearchParams((params) => {
                  params.set("type", tag);
                  return params;
                });
              }}
            >
              {tag}
            </Tag.CheckableTag>
          ))}
          <EmployeeSearch query={query} onQueryChange={setQuery} />
        </Flex>
      </div>
      <EmployeeTable data={filteredData || []} update={refetch} />
    </div>
  );
};
