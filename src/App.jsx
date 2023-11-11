import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import store from "./app/store";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./themes";
import "./components/custom-scrollbar.css";
import "./components/loading-bars.css";

const App = () => {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
      <CssBaseline />
    </Provider>
  );
};

export default App;
