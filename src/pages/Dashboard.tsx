import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchRecords } from "../utils/http";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const DashboardPage = () => {
  let totalCount = 0;


  const [pagination, setPagination] = useState({
    totalCount: 0,
    currentPage: 0,
    pageSize: 20,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();



  const { data, isPending, isError, error } = useQuery({
    queryKey: ["records", { start: pagination.currentPage, pageSize: pagination.pageSize }],
    queryFn: ({ signal }) => fetchRecords({ signal, currentPage: pagination.currentPage, pageSize: pagination.pageSize }),
  });

  const onSelectHandler = (val: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: val
    }));

    setSearchParams({ page: val.toString() });
    navigate(`/?page=${val.toString()}`)
  };

  const onPageSizeChangeHandler = (val: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: 0,
      pageSize: val
    }));

    setSearchParams({ page: "0" });
    navigate(`/?page=0`)

  }

  const columns = {
    microsoftDetectionName: {
      key: "microsoftDetectionName",
      label: "Microsoft Detection Name"
    },
    extension: {
      key: "extension",
      label: "Extension"
    },
    encryptionAlgorithm: {
      key: "encryptionAlgorithm",
      label: "Encryption Algorithm"
    }
  }

  let content;

  if (isPending) {
    content = <h2>Loading.....</h2>
  }

  if (isError) {
    content = <div style={{ background: "red" }}>{error?.message}</div>
  }

  if (data) {
    content = <Table data={[...data.records]} />;
    totalCount = data.total;
  }


  return (
    <div>
      <h2>Ransomware Dashboard</h2>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
      }}>
        <Pagination
          totalCount={totalCount}
          pageSize={pagination.pageSize}
          currentPage={pagination.currentPage}
          onPageSizeChange={onPageSizeChangeHandler}
          onSelect={onSelectHandler} />
        <div>{content}</div>
      </div>
    </div>

  )
}

export default DashboardPage;

/**
 * 1. GET Api call to get all reports.
 * 2. Filter the dashboard based on inputs
 * 
 * 
 * 
 * Given this JSON as a sample, create program that uses that as a data for front end
Design UI for the system for reporting dashboard
In the case of duplicate entries, how will you handle them on UI?
Design and Implement a REST API for front end consumption
Design a RESTful API for the system that allows users to store and retrieve data. Implement the endpoints in the language of your choice. Ensure that your API supports the basic CRUD operations on the data. 
How will you write a short script/program to process this json and store into databases
Explain selection of coding language and DB of your choice.
Link 
https://github.com/codingo/Ransomware-Json-Dataset/blob/master/ransomware_overview.json
 
 */