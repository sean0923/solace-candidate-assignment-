"use client";

import { useFetchAdvocates } from "@/utils/use-fetch-advociates";
import { formatPhoneNumber } from "@/utils/utils";
import { Button, Group, Space, Table, TextInput, Title } from "@mantine/core";
import { debounce } from "lodash";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: advocateResp } = useFetchAdvocates({ searchTerm });
  const advocates = advocateResp || [];

  const handleResetBtnClick = () => {
    setSearchTerm("");
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main style={{ margin: "24px" }}>
      <Title>Solace Advocates</Title>

      <Space h="xl" />

      <div>
        <Group>
          <p>
            Searching for: <span id="search-term"></span>
          </p>
          <TextInput onChange={debounce(handleQueryChange, 1000)} />
          <Button onClick={handleResetBtnClick}>Reset Search</Button>
        </Group>
      </div>

      <Space h="xl" />

      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>First Name</Table.Th>
            <Table.Th>Last Name</Table.Th>
            <Table.Th>City</Table.Th>
            <Table.Th>Degree</Table.Th>
            <Table.Th>Specialties</Table.Th>
            <Table.Th>Years of Experience</Table.Th>
            <Table.Th>Phone Number</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {advocates.map((advocate, idx) => {
            return (
              <Table.Tr key={idx}>
                <Table.Td>{advocate.firstName}</Table.Td>
                <Table.Td>{advocate.lastName}</Table.Td>
                <Table.Td>{advocate.city}</Table.Td>
                <Table.Td>{advocate.degree}</Table.Td>
                <Table.Td>
                  {advocate.specialties.map((s, j) => (
                    <div key={j}>{s}</div>
                  ))}
                </Table.Td>
                <Table.Td>{advocate.yearsOfExperience}</Table.Td>
                <Table.Td>{formatPhoneNumber(advocate.phoneNumber)}</Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </main>
  );
}
