import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectProps } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SortOption } from '@pages/catalog/CatalogPage';

interface SortByComponentProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const SortByComponent = ({
  sortOption,
  onSortChange,
}: SortByComponentProps) => {
  const handleSortChange: SelectProps<SortOption>['onChange'] = (event) => {
    const newSortOption = event.target.value as SortOption;
    onSortChange(newSortOption);
  };

  return (
    <Box sx={{ width: 200, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="sort-by-label">Sort by</InputLabel>
        <Select
          labelId="sort-by-label"
          value={sortOption}
          onChange={handleSortChange}
          label="Sort by"
          IconComponent={() => <ArrowDropDownIcon />}
        >
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="price_asc">Price: Low to high</MenuItem>
          <MenuItem value="price_desc">Price: High to low</MenuItem>
          <MenuItem value="name_asc">Name A → Z</MenuItem>
          <MenuItem value="name_desc">Name Z → A</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
