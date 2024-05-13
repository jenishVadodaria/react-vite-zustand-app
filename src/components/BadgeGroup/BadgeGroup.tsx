import { Badge, Group, Text } from "@mantine/core";
import React from "react";

const BadgeGroup = ({
  title,
  data,
  gap,
  color,
}: {
  title?: string;
  data: string;
  gap: string;
  color: string;
}) => {
  return (
    <Group noWrap style={{ gap: gap }}>
      <Text size="sm" fw={300} fz={"lg"}>
        {title ? title : ""}
      </Text>
      <Badge color={color} variant="filled" size={"lg"} radius={"lg"}>
        {data ? data : "-"}
      </Badge>
    </Group>
  );
};

export default BadgeGroup;
