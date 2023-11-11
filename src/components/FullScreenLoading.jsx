import Box from "@mui/material/Box";

export default function FullScreenLoading() {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width="10%"
        height="10%"
        style={isDarkTheme ? { filter: "invert(100%)" } : {}}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect className="spinner_hzlK" x="1" y="1" width="6" height="22" />
        <rect
          className="spinner_hzlK spinner_koGT"
          x="9"
          y="1"
          width="6"
          height="22"
        />
        <rect
          className="spinner_hzlK spinner_YF1u"
          x="17"
          y="1"
          width="6"
          height="22"
        />
      </svg>
    </Box>
  );
}
