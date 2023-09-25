import { useDispatch, useSelector } from "react-redux";
import getBlogs from "../../../thunks/getBlogs";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Card from "./Card";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import CardSkeleton from "../../Skeletons/CardSkeleton";

const Blogs = () => {
  const { blogs, loading } = useSelector(({ blog }) => blog);
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  const sortedBlogs = [...blogs];

  switch (sort) {
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

  return (
    <Box mt={4} px={2} maxWidth="lg" mx="auto">
      <FormControl sx={{ float: "left", width: 140 }}>
        <TextField
          size="small"
          label="Search"
          variant="standard"
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
          value={sort}
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
          : sortedBlogs.map((blog) => (
              <Card key={blog.id + blog.title} data={blog} />
            ))}
      </Grid>
    </Box>
  );
};

export default Blogs;
