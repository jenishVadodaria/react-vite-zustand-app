import React, { useState } from "react";
import { Pagination } from "@mantine/core";

interface IProps {
  page: number;
  setPageCount: (page: number) => void;
  totalPages: number;
}

const PeopleListPagination = ({ page, setPageCount, totalPages }: IProps) => {
  return <Pagination value={page} onChange={setPageCount} total={totalPages} />;
};

export default PeopleListPagination;
