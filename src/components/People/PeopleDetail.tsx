import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPeopleById } from "./service/api";
import {
  Badge,
  Box,
  Chip,
  Flex,
  Group,
  Skeleton,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import classes from "./People.module.css";
import BadgeGroup from "../BadgeGroup/BadgeGroup";
import HomeWorld from "../Homeworld/HomeWorld";
import Film from "../Films/Film";
import StarShip from "../StarShips/StarShip";

const PeopleDetail = () => {
  const [homeWorldId, setHomeWorldId] = useState<string>("");
  const [starShipId, setStarShipId] = useState<string>("");
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getPeopleById", id],
    queryFn: () => getPeopleById(id as string),
  });

  useEffect(() => {
    if (data) {
      const HomeWorldUrl = data?.homeworld;
      const segments = HomeWorldUrl?.split("/");
      if (segments) {
        setHomeWorldId(segments[segments.length - 2]);
      }

      const StarShipUrl = data?.starships[0];
      const segmentsStarShip = StarShipUrl?.split("/");
      if (segmentsStarShip) {
        setStarShipId(segmentsStarShip[segmentsStarShip.length - 2]);
      }
    }
  }, [data]);

  return (
    <Box
      sx={(theme) => ({
        height: "100%",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
      })}
    >
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
        <Flex
          justify="flex-start"
          gap={"md"}
          style={{ gap: "3.5rem" }}
          // wrap={"wrap"}
          className={classes.biocontainer}
        >
          <Stack
            justify="flex-start"
            align={"flex-start"}
            spacing={"md"}
            w={"45%"}
            style={{ padding: "0.75rem", margin: "0.75rem" }}
            className={classes.biobox}
          >
            <Text size="lg" fw={500} className={classes.title}>
              {data?.name}
            </Text>
            <Group spacing={"xl"} position="left" style={{ gap: "1.5rem" }}>
              <BadgeGroup
                title={"born"}
                data={data?.birth_year as string}
                gap="5px"
                color="green"
              />
              <BadgeGroup
                title={"gender"}
                data={data?.gender as string}
                gap="5px"
                color="green"
              />
              <BadgeGroup
                title={"height"}
                data={data?.height as string}
                gap="5px"
                color="green"
              />
              <BadgeGroup
                title={"mass"}
                data={data?.mass as string}
                gap="5px"
                color="green"
              />
            </Group>
          </Stack>

          <Box
            sx={(theme) => ({
              height: "100%",
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
              margin: theme.spacing.md,
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
              width: "45%",
            })}
            className={classes.characteristics}
          >
            <Title order={3}>Characteristics</Title>
            <Group
              spacing={"xl"}
              position="left"
              style={{ gap: "2.5em", marginTop: "1rem" }}
            >
              <BadgeGroup
                title={"Eye color"}
                data={data?.eye_color as string}
                gap="8px"
                color="green"
              />
              <BadgeGroup
                title={"Hair color"}
                data={data?.hair_color as string}
                gap="8px"
                color="green"
              />
              <BadgeGroup
                title={"Skin color"}
                data={data?.skin_color as string}
                gap="8px"
                color="green"
              />
            </Group>
          </Box>
        </Flex>
      )}
      <Space h="xl" style={{ marginTop: "1rem" }} />
      <Flex
        justify="flex-start"
        gap={"md"}
        style={{ gap: "3.5rem" }}
        wrap={"wrap"}
      >
        <HomeWorld homeWorldId={homeWorldId} />
        <StarShip StarShipId={starShipId} />
      </Flex>
      <Space h="xl" style={{ marginTop: "1rem" }} />
      <Film films={data?.films} />
    </Box>
  );
};

export default PeopleDetail;
