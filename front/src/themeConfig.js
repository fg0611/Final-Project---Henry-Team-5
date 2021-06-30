import { createMuiTheme } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightGreen[700],
    },
  },
});

export default theme;
