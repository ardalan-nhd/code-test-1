import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
    margin: "20px 0px",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1.25rem 1.5rem",
    borderBottom: "1px solid rgba(0, 0, 0,.05)",
    marginBottom: 0,
    backgroundColor: "#f5f5f5",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: "20px",
    flex: "1 1 auto",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "20px",
  },
  icon: {
    display: "inline-table !important",
  },
}));
