import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPeople } from "./service/api";
import {
  Box,
  Loader,
  Skeleton,
  Space,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import PeopleListPagination from "./PeopleListPagination";
import { debounce } from "../../utils/debounce";
import classes from "./People.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { Sort } from "../../utils/sort";
import PreviewSvg from "../../assets/svg/PreviewSvg";
import UpArrowSvg from "../../assets/svg/UpArrowSvg";
import DownArrowSvg from "../../assets/svg/DownArrowSvg";

const PeopleList = () => {
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const qpage = parseInt(queryParams.get("qpage") || "1");
  const qsearch = queryParams.get("qsearch") || "";
  const sortcol = queryParams.get("sortcol") || "";
  const sortdir = queryParams.get("sortdir") || "";
  const [page, setPage] = useState<number>(Number(qpage) || 1);
  const [search, setSearch] = useState<string>(qsearch || "");
  const [searchInput, setSearchInput] = useState<string>(qsearch || "");
  const [sortColumn, setSortColumn] = useState<string>(sortcol || "");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | string>(
    sortdir || ""
  );

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

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchInput !== "") {
      params.set("qsearch", search);
    }
    if (page) {
      params.set("qpage", page.toString());
    }

    if (sortColumn) {
      params.set("sortcol", sortColumn);
    }

    if (sortDirection) {
      params.set("sortdir", sortDirection);
    }

    navigate(`?${params.toString()}`, { replace: true });
  }, [
    page,
    search,
    sortColumn,
    sortDirection,
    qpage,
    qsearch,
    sortcol,
    sortdir,
  ]);

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

  const sortedData = data && Sort(data?.results, sortColumn, sortDirection);

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
        <PreviewSvg className={classes.preview} />
      </td>
    </tr>
  ));

  const renderArrow = (column: string) => {
    return sortColumn === column ? (
      sortDirection === "asc" ? (
        <UpArrowSvg className={`${classes.arrow}`} />
      ) : (
        <DownArrowSvg className={classes.arrow} />
      )
    ) : (
      <UpArrowSvg className={classes.arrow} />
    );
  };

  const headings = [
    "Name",
    "Height",
    "Mass",
    "Gender",
    "Films",
    "Starships",
    "Vehicles",
  ];

  const headingRow = headings.map((heading) => (
    <th key={heading} onClick={() => handleSort(heading.toLocaleLowerCase())}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Text
          style={{
            color:
              sortColumn === heading.toLocaleLowerCase()
                ? "#000000"
                : "#495057",
          }}
        >
          {heading}
        </Text>
        {renderArrow(heading.toLocaleLowerCase())}
      </Box>
    </th>
  ));

  return (
    <Box
      sx={(theme) => ({
        height: "100%",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        // border: "3px solid black",
      })}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "2rem",
        }}
      >
        <Title order={1}>People List</Title>
        <Space h="xl" style={{ marginTop: "1.5rem" }} />
        <Box
          sx={{
            border: "1px solid #0000001a",
            borderRadius: "0.75rem",
            padding: "1rem 0rem 2rem 1rem",
          }}
        >
          <TextInput
            placeholder="Search by name"
            label=""
            className={classes.searchbox}
            onChange={(e) => onSearchChange(e.target.value)}
            value={searchInput}
          />
          <Box sx={{ overflow: "auto" }}>
            <Table
              striped
              highlightOnHover
              // withBorder
              horizontalSpacing="md"
              verticalSpacing="md"
              fontSize="md"
              // sx={{ width: "95%" }}
            >
              <thead>
                <tr>
                  {headingRow}
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
      </Box>
      {data && data.results.length > 0 && (
        <Box
          sx={{
            marginTop: "2.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "3rem",
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
