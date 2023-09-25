import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import useGetCategories from "../../hooks/useGetCategories";

const CategoriesSelect = ({ value, error, handleChange }) => {
  const { categories, getBlogCategories } = useGetCategories();

  useEffect(() => {
    getBlogCategories();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        labelId="category-label"
        id="category"
        name="category"
        value={categories.loading ? "": value}
        label="Category"
        error={error || categories.error}
        variant="outlined"
        onChange={handleChange}
        disabled={categories.loading}
      >
        {categories.data.map((category) => (
          <MenuItem key={category.name} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoriesSelect;
