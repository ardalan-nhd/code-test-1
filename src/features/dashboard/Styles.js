import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  grid: {
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    alignItems: "center",
  },
  root: {
    padding: "80px",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "& .MuiOutlinedInput-input:autofill": {
      WebkitBoxShadow: `0 0 0 30px #ffffff inset !important`,
    },
  },
  select: {
    "& .MuiSelect-select": {
      display: "flex !important",
    },
  },
}));
