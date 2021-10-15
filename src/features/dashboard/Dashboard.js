import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import walletApi from "../../api/walletApi";
import FormCard from "../../components/FormCard/index";
import { notification } from "../../components/Notifications";
import { yupResolver } from "@hookform/resolvers/yup";
import getValidationSchema from "../registration/Schema";
import { useForm } from "react-hook-form";
import useStyles from "./Styles";

const currencies = [
  {
    value: "BTC",
    label: "BTC",
    address: "bc1qtk6l2cnlyax6x2xynp03q6knzz7eqekmaw2wax",
  },
  {
    value: "ETH",
    label: "ETH",
    address: "0xa33B17d671968eAcc488726554e0065864198486",
  },
  {
    value: "TRX",
    label: "TRX",
    address: "TPjGbG6L7Rp9tsKzJPvtQr65PCnEtys5KU",
  },
];

const Dashboard = (props) => {
  const classes = useStyles();
  const [currency, setCurrency] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(getValidationSchema(["title", "blockchain"])),
  });

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const getCurrency = (el) => {
    let result = 0;
    currencies.map((item) => {
      if (item.value === el) {
        result = item.address;
      }
    });
    return result;
  };
  const onSubmit = (data) => {
    const val = getCurrency(currency);
    console.log(val);
    if (currency) {
      walletApi
        .creatWallet({
          payload: {
            title: data.title,
            status: 1,
            blockchain: data.blockchain,
            address: val || getCurrency(currency),
          },
        })
        .then((data) => {
          notification(
            "موفقیت آمیز",
            "success",
            data?.message ? data.message : "کیف با موفقیت اضافه شد"
          );
        })
        .catch((error) => {
          notification(
            "خطا",
            "danger",
            error?.message ? error.message : "مشکلی پیش آمده است"
          );
        });
    }
  };
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5">سلام به صفحه حساب کابری خوش آمدید</Typography>
      <FormCard
        title={"ساخت کیف پول"}
        imageSrc={"../../../wallet.svg"}
        saveButton={
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
          >
            ساخت کیف پول
          </Button>
        }
      >
        <Grid container style={{ marginBottom: "20px" }}>
          <Typography variant="body">نام کیف پول</Typography>
          <TextField
            fullWidth
            name="title"
            size="small"
            variant="outlined"
            inputRef={register("title").ref}
            {...register("title")}
            helperText={errors.title && errors.title.message}
            error={errors.title}
          />
        </Grid>
        <Grid container style={{ marginBottom: "20px" }}>
          <Typography className={classes.label} variant="sm" color="text">
            {"انتخاب ارز دیجیتال"}
          </Typography>
          <TextField
            fullWidth
            name="blockchain"
            size="small"
            variant="outlined"
            inputRef={register("blockchain").ref}
            {...register("blockchain")}
            id="outlined-select-blockchain"
            select
            value={currency}
            onChange={handleChange}
            className={classes.select}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <img
                  src={window.location.origin + `/${option.label}.svg`}
                  alt={option.label}
                  width="30"
                />{" "}
                <Typography style={{ padding: "0px 10px" }}>
                  {option.label}
                </Typography>
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid container style={{ marginBottom: "20px" }}>
          <Typography className={classes.label} variant="sm" color="text">
            {"آدرس کیف"}
          </Typography>
          <TextField
            fullWidth
            name="address"
            size="small"
            disabled
            variant="outlined"
            value={getCurrency(currency)}
          />
        </Grid>
      </FormCard>
    </form>
  );
};
export default Dashboard;
