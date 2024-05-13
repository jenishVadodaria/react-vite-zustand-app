import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPeople } from "./service/api";
import { Box, Loader, Skeleton, Table, TextInput, Title } from "@mantine/core";
import PeopleListPagination from "./PeopleListPagination";
import { debounce } from "../../utils/debounce";
import classes from "./People.module.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

const PeopleList = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [totalPages, setTotalPages] = useState(0);
  const [sortColumn, setSortColumn] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllPeople", page, search],
    queryFn: () =>
      getAllPeople({
        page: search ? 1 : page,
        search: search,
      }),
  });

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data?.count / 10));
    }
  }, [data]);

  const setPageCount = (page: number) => {
    setPage(page);
  };

  const handleDebounce = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 700),
    []
  );

  const onSearchChange = (value: string) => {
    setSearchInput(value);
    handleDebounce(value);
  };

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = data?.results.slice().sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (sortColumn === "height" || sortColumn === "mass") {
      const aValue = parseFloat(a[sortColumn]);
      const bValue = parseFloat(b[sortColumn]);
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (Array.isArray(aValue) && Array.isArray(bValue)) {
      return sortDirection === "asc"
        ? aValue.length - bValue.length
        : bValue.length - aValue.length;
    }
    return 0;
  });

  const handleDetailPageNavigation = (url: string, name: string) => {
    const segments = url.split("/");
    const id = segments[segments.length - 2];
    navigate(`${ROUTES.swapi.people}/${name}/${id}`);
  };

  const rows = sortedData?.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{row.height}</td>
      <td>{row.mass}</td>
      <td>{row.gender}</td>
      <td>{row.films.length}</td>
      <td>{row.starships.length}</td>
      <td>{row.vehicles.length}</td>
      <td onClick={() => handleDetailPageNavigation(row.url, row.name)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.7}
          stroke="currentColor"
          className={classes.preview}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </td>
    </tr>
  ));

  const renderArrow = (column: string) => {
    return sortColumn === column ? (
      sortDirection === "asc" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className={classes.arrow}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className={classes.arrow}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      )
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className={classes.arrow}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 15.75 7.5-7.5 7.5 7.5"
        />
      </svg>
    );
  };

  return (
    <Box
      sx={(theme) => ({
        height: "100%",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
      })}
    >
      <Title order={1} sx={{ margin: "2rem" }}>
        People List
      </Title>
      <Box
        sx={{
          margin: "2rem",
          overflow: "auto",
          border: "1px solid #0000001a",
          borderRadius: "0.75rem",
          padding: "1rem 0rem 2rem 0rem",
        }}
      >
        <TextInput
          placeholder="Search by name"
          label=""
          style={{ width: "30%", margin: "0rem 0rem 0.3rem 2rem" }}
          onChange={(e) => onSearchChange(e.target.value)}
          value={searchInput}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Table
            striped
            highlightOnHover
            // withBorder
            horizontalSpacing="md"
            verticalSpacing="md"
            fontSize="md"
            sx={{ width: "95%" }}
          >
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>
                  Name {renderArrow("name")}
                </th>
                <th onClick={() => handleSort("height")}>
                  Height {renderArrow("height")}
                </th>
                <th onClick={() => handleSort("mass")}>
                  Mass {renderArrow("mass")}
                </th>
                <th onClick={() => handleSort("gender")}>
                  Gender {renderArrow("gender")}
                </th>
                <th onClick={() => handleSort("films")}>
                  Films {renderArrow("films")}
                </th>
                <th onClick={() => handleSort("starships")}>
                  Starships {renderArrow("starships")}
                </th>
                <th onClick={() => handleSort("vehicles")}>
                  Vehicles {renderArrow("vehicles")}
                </th>
                <th>Preview</th>
              </tr>
            </thead>
            {isLoading ? (
              <tr>
                <td colSpan={7}>
                  <Skeleton height={18} mt={20} radius="xl" />
                  <Skeleton height={18} mt={20} radius="xl" />
                  <Skeleton height={18} mt={20} radius="xl" />
                  <Skeleton height={18} mt={20} radius="xl" />
                  <Skeleton height={18} mt={20} radius="xl" />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: "center", marginTop: "2rem" }}
                >
                  Error fetching data!
                </td>
              </tr>
            ) : (
              <>
                {data.results.length > 0 ? (
                  <tbody>{rows}</tbody>
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center" }}>
                      No data found!
                    </td>
                  </tr>
                )}
              </>
            )}
          </Table>
        </Box>
      </Box>
      {data && data.results.length > 0 && (
        <Box
          sx={{
            marginTop: "2.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "3  rem",
          }}
        >
          <PeopleListPagination
            setPageCount={setPageCount}
            page={page}
            totalPages={totalPages}
          />
        </Box>
      )}
    </Box>
  );
};

export default PeopleList;
