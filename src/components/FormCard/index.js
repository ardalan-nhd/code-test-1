import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import useStyles from "./styles";

const FormCard = (props) => {
  const {
    title,
    subTitle,
    imageSrc,
    saveButton,
    cancelButton,
    children,
    col = { xs: 12, sm: 10, md: 8, lg: 6, xl: 4 },
  } = props;
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <Grid item {...col}>
        <Card className={classes.root}>
          <div className={classes.header}>
            <Grid container spacing={5} direction="column" justify="center">
              <Grid item>
                <Typography variant="h5">{title}</Typography>
              </Grid>
              {!!subTitle && (
                <Grid item>
                  <Typography variant="body">{subTitle}</Typography>
                </Grid>
              )}
            </Grid>
            <img src={imageSrc} width={50} height={50} alt="logo" />
          </div>
          <div className={classes.content}>
            <div className={classes.children}>{children}</div>
            <div className={classes.actions}>
              <div style={{ marginLeft: "5px" }}>{cancelButton}</div>
              <div>{saveButton}</div>
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FormCard;
