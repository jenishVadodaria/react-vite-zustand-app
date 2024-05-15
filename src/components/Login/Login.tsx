import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Center,
  Group,
  Image,
  Box,
} from "@mantine/core";
import { useAuthData } from "../../store/auth.store";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { ZodFormattedError } from "zod";
import { LoginSchema, TLoginSchema } from "./schema/login.schema";
import { useMutation } from "@tanstack/react-query";
import { login } from "./services/api";
import toast from "react-hot-toast";
import { ROUTES } from "../../routes/routes";
import star_wars_image from "../../assets/star_wars_image.jpg";

export type ZodLoginSchemaErrors = ZodFormattedError<TLoginSchema>;

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ZodLoginSchemaErrors | null>(null);
  const [disableLoginButton, setDisableLoginButton] = useState<boolean>(false);

  const { setAccessToken, setAuthData } = useAuthData();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: () => login(loginData),
    onSuccess: (data) => {
      toast.success("Successfully Logged In");
      setAccessToken({ access_token: data.access_token });
      setAuthData({
        authData: {
          access_token: data.access_token,
        },
        user: data,
      });
      navigate(ROUTES.swapi.people);
    },
    onError: (error) => {
      setDisableLoginButton(false);
      toast.error(error as string);
    },
  });

  const handleLogin = async () => {
    try {
      const result = await LoginSchema.safeParseAsync(loginData);
      if (!result.success) {
        setErrors(result.error.format());
        return;
      }
      setDisableLoginButton(true);
      loginMutation.mutate();
    } catch (error) {
      console.error(error);
      toast.error(error as string);
    }
  };

  return (
    // <Center h={"100vh"}>
    // <Container size={500} className={classes.container}>
    <Container
      p={0}
      m={0}
      w={"100%"}
      h={"100%"}
      maw={"100%"}
      // className={classes.container}
    >
      <Group position="left" w={"100%"} maw={"100%"} noWrap>
        <Image
          src={star_wars_image}
          alt="Star Wars Logo"
          width={"100%"}
          maw={"50%"}
          height={"100vh"}
          className={classes.sw_image}
        />
        <Box
          sx={{
            maxWidth: "50%",
            width: "100%",
            padding: "2rem",
          }}
          className={classes.loginbox}
        >
          <Title ta="center" mb={30} className={classes.title}>
            Welcome TO SWAPI!
          </Title>

          <Paper
            withBorder
            shadow="md"
            p={30}
            // m={0 100 100 100}
            radius="md"
            className={classes.paper}
          >
            <TextInput
              label="Email"
              placeholder="Enter Your Email"
              required
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            {errors?.email?._errors && errors?.email?._errors.length > 0 && (
              <div className={classes.error}>{errors?.email?._errors[0]}</div>
            )}
            <PasswordInput
              label="Password"
              placeholder="Enter Your password"
              required
              mt="md"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            {errors?.password?._errors &&
              errors?.password?._errors.length > 0 && (
                <div className={classes.error}>
                  {errors?.password?._errors[0]}
                </div>
              )}

            <Button
              fullWidth
              mt="xl"
              style={{
                fontWeight: 500,
                color: `${disableLoginButton ? "black" : "white"}`,
              }}
              onClick={handleLogin}
              disabled={disableLoginButton}
            >
              {disableLoginButton ? "Logging In..." : "Login"}
            </Button>
          </Paper>
        </Box>
      </Group>
    </Container>
    // </Center>
  );
};

export default Login;
