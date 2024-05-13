import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getHomeWorldById } from "./service/api";
import {
  Box,
  Group,
  Loader,
  Skeleton,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import BadgeGroup from "../BadgeGroup/BadgeGroup";
import classes from "./Homeworld.module.css";

const HomeWorld = ({ homeWorldId }: { homeWorldId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getHomeWorldById", homeWorldId],
    queryFn: () => getHomeWorldById(homeWorldId),
  });

  if (data === null) {
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
      <Title order={3}>Homeworld Details</Title>
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
        <Group
          spacing={"lg"}
          position="left"
          style={{ gap: "2em", marginTop: "1rem" }}
        >
          <Stack justify="flex-start" align={"flex-start"} spacing={"md"}>
            <BadgeGroup
              title={"Planet Name"}
              data={data?.name as string}
              gap="10px"
              color="grape"
            />
            <BadgeGroup
              title={"Rotation Period"}
              data={data?.rotation_period as string}
              gap="10px"
              color="grape"
            />
            <BadgeGroup
              title={"Orbital Period"}
              data={data?.orbital_period as string}
              gap="10px"
              color="grape"
            />
            <BadgeGroup
              title={"Diameter"}
              data={data?.diameter as string}
              gap="10px"
              color="grape"
            />
          </Stack>

          <Stack justify="flex-start" align={"flex-start"} spacing={"md"}>
            <BadgeGroup
              title={"Climate"}
              data={data?.climate as string}
              gap="10px"
              color="grape"
            />
            <BadgeGroup
              title={"Gravity"}
              data={data?.gravity as string}
              gap="10px"
              color="grape"
            />
            <BadgeGroup
              title={"Terrain"}
              data={data?.terrain as string}
              gap="10px"
              color="grape"
            />
            <BadgeGroup
              title={"Population"}
              data={data?.population as string}
              gap="10px"
              color="grape"
            />
          </Stack>
        </Group>
      )}
    </Box>
  );
};

export default HomeWorld;
