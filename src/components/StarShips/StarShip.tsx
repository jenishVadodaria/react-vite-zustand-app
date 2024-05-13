import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getStarShipById } from "./service/api";
import { Box, List, Skeleton, Space, Text, Title } from "@mantine/core";
import classes from "./Starship.module.css";

const StarShip = ({ StarShipId }: { StarShipId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getStarShipById", StarShipId],
    queryFn: () => getStarShipById(StarShipId),
  });

  if (!data) {
    <Text size={"sm"} weight={400}>
      No Data Found!
    </Text>;
  }
  return (
    <Box
      sx={(theme) => ({
        height: "100%",
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        margin: theme.spacing.md,
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
        width: "45%",
      })}
      className={classes.mainbox}
    >
      <Title order={3}>Starship Details</Title>
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
        <List size="lg" withPadding spacing={"md"}>
          <List.Item>Name - {data?.name}</List.Item>
          <List.Item>Model - {data?.model}</List.Item>
          <List.Item>Manufacturer - {data?.manufacturer}</List.Item>
          <List.Item>Class - {data?.starship_class}</List.Item>
        </List>
      )}
    </Box>
  );
};

export default StarShip;
