import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, TextField, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import getValidationSchema from "./Schema";
import { useUserDispatch } from "../../context/user/UserContext";
import { notification } from "../../components/Notifications";
import { USER_LOGIN } from "../../context/action/UserAction";
import useStyles from "./Styles";
import authApi from "../../api/authApi";
import captchaApi from "../../api/captchaApi";

const LoginForm = () => {
  const classes = useStyles();
  const dispatchUser = useUserDispatch();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getValidationSchema(["userName", "password"])),
  });
  useEffect(() => {
    captchaApi.getCaptcha({}).then((res) => {
      setState(res);
    });
  }, []);
  // console.log(state);
  const submit = (value) => {
    setLoading(true);
    authApi
      .login({
        payload: {
          username: value.userName,
          password: value.password,
          captcha: value.captcha,
          remember: "0",
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        // dispatchUser({
        //   type: USER_LOGIN.SUCCESS,
        //   payload: {
        //     token: res.data.access_token,
        //     user: {
        //       username: value.userName,
        //     },
        //   },
        // });
      })
      .catch((error) => {
        setLoading(false);
        notification(
          "Error",
          "danger",
          error?.message ? error.message : "An error occurred on the server"
        );
      });
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <div className={classes.content}>
          <div className={classes.image} />
          <Typography variant="h4" className={classes.titleLogin}>
            {"خوش آمدید"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(submit)}>
            <Grid container spacing={8}>
              <>
                <Grid
                  item
                  className={classes.formControl2}
                  {...{ xl: 12, lg: 12, md: 12, xs: 12, sm: 12 }}
                >
                  <TextField
                    autoFocus={true}
                    className={classes.input}
                    name={"userName"}
                    inputProps={{ min: 0, style: { textAlign: "center" } }}
                    inputRef={register("userName").ref}
                    {...register("userName")}
                    helperText={errors.userName && errors.userName.message}
                    error={errors.userName}
                    placeholder={"نام کاربری"}
                  />
                </Grid>
                <Grid
                  item
                  className={classes.formControl2}
                  {...{ xl: 12, lg: 12, md: 12, xs: 12, sm: 12 }}
                >
                  <TextField
                    name={"password"}
                    inputProps={{
                      min: 0,
                      style: { textAlign: "center", color: "white" },
                    }}
                    className={classes.input}
                    inputRef={register("password").ref}
                    {...register("password")}
                    helperText={errors.password && errors.password.message}
                    error={errors.password}
                    placeholder={"رمز عبور"}
                  />
                </Grid>
                <Grid
                  item
                  className={classes.formControl2}
                  {...{ xl: 12, lg: 12, md: 12, xs: 12, sm: 12 }}
                >
                  <TextField
                    name={"captcha"}
                    inputProps={{
                      min: 0,
                      style: { textAlign: "center", color: "white" },
                    }}
                    className={classes.input}
                    inputRef={register("captcha").ref}
                    {...register("captcha")}
                    helperText={errors.captcha && errors.captcha.message}
                    error={errors.captcha}
                    placeholder={"captcha"}
                  />
                </Grid>
              </>
            </Grid>
            <div className={classes.buttonWrapperLogin}>
              <Button type="submit" variant="contained" className={classes.btn}>
                {"ورود"}
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default LoginForm;
