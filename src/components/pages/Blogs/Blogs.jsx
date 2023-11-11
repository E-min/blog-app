import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "@mui/icons-material";
import getBlogs from "../../../thunks/getBlogs";
import CardSkeleton from "../../Skeletons/CardSkeleton";
import Card from "./Card";

const sortBlogs = (arr, type) => {
  const sortedBlogs = [...arr];
  if (typeof type === "number") {
    switch (type) {
      case 10: // Sort by Date
        sortedBlogs.sort(
          (a, b) => new Date(b.publish_date) - new Date(a.publish_date)
        );
        break;
      case 20: // Sort by Likes
        sortedBlogs.sort((a, b) => b.likes - a.likes);
        break;
      case 30: // Sort by Views
        sortedBlogs.sort((a, b) => b.post_views - a.post_views);
        break;
      default:
        // No sorting
        break;
    }
  } else {
    sortedBlogs.sort((a, b) => {
      const indexOfA = a.title.toLowerCase().indexOf(type.toLowerCase());
      const indexOfB = b.title.toLowerCase().indexOf(type.toLowerCase());

      if (indexOfA === -1 && indexOfB === -1) {
        return 0; // If the search string is not found in either, maintain current order
      }
      if (indexOfA === -1) {
        return 1; // If the search string is only in B, move B to a higher index
      }
      if (indexOfB === -1) {
        return -1; // If the search string is only in A, move A to a higher index
      }
      // If the search string is in both, sort based on their index
      return indexOfA - indexOfB;
    });
  }
  return sortedBlogs;
};

export default function Blogs() {
  const { blogs, loading } = useSelector(({ blog }) => blog);
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <Box mt={4} px={2} maxWidth="lg" mx="auto" className="scrollable-content">
      <FormControl sx={{ float: "left", width: 140 }}>
        <TextField
          size="small"
          label="Search"
          variant="standard"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <FormControl sx={{ float: "right", width: 80 }}>
        <InputLabel id="sort-label">Sort</InputLabel>
        <Select
          labelId="sort-label"
          id="sort"
          value={typeof type === "number" ? sort : ""}
          label="Sort"
          onChange={handleChange}
          size="small"
          variant="standard"
        >
          <MenuItem value={""}>None</MenuItem>
          <MenuItem value={10}>Date</MenuItem>
          <MenuItem value={20}>Likes</MenuItem>
          <MenuItem value={30}>View</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={4}>
        {loading
          ? Array.from({ length: 8 }, (_, index) => (
              <CardSkeleton key={index} />
            ))
          : sortBlogs(blogs, sort).map((blog) => (
              <Card key={blog.id + blog.title} data={blog} />
            ))}
      </Grid>
    </Box>
  );
}
