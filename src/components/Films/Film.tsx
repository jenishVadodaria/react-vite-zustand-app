import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllFilms, getFilmById } from "./service/api";
import {
  Accordion,
  Box,
  Group,
  Skeleton,
  Space,
  Text,
  Title,
} from "@mantine/core";
import BadgeGroup from "../BadgeGroup/BadgeGroup";

const Film = ({ films }: { films: string[] | undefined }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllFilms"],
    queryFn: () => getAllFilms(),
  });

  const filteredFilms =
    data && data?.results.filter((film) => films?.includes(film.url));

  const accordionItems = filteredFilms?.map((item) => (
    <Accordion.Item key={item.title} value={item.title}>
      <Accordion.Control>
        <Group spacing={"sm"} position="left" style={{ gap: "1rem" }}>
          {item.title}
          <BadgeGroup data={item.director} gap="10px" color="grape" />
          <BadgeGroup data={item.release_date} gap="10px" color="grape" />
        </Group>
      </Accordion.Control>
      <Accordion.Panel>{item.opening_crawl}</Accordion.Panel>
    </Accordion.Item>
  ));

  if (!data) {
    <Text size={"sm"} weight={400}>
      No Data Found!
    </Text>;
  }

  return (
    <Box
      sx={(theme) => ({
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        margin: theme.spacing.md,
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
      })}
    >
      <Title order={3}>Filmography</Title>
      <Space h="xl" />
      {isLoading ? (
        <>
          <Skeleton height={18} mt={20} radius="xl" />
          <Skeleton height={18} mt={20} radius="xl" />
          <Skeleton height={18} mt={20} radius="xl" />
        </>
      ) : isError ? (
        <Text size={"sm"} weight={400} style={{ color: "red" }}>
          Error Fetching Details!
        </Text>
      ) : (
        <Accordion variant="separated" radius="lg">
          {accordionItems}
        </Accordion>
      )}
    </Box>
  );
};

export default Film;
