import { useState } from 'react';
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

interface ColorRangeProps {
  colors: string[];
  selectedColors: string[];
  onChange?: (colors: string[]) => void;
}

export const ColorRange: React.FC<ColorRangeProps> = ({
  colors,
  selectedColors,
  onChange,
}: ColorRangeProps) => {
  const [allVariantColors, setAllVariantColors] = useState<string[]>([]);

  if (allVariantColors.length === 0) {
    setAllVariantColors(colors);
  }

  const handleColorChange = (color: string) => {
    if (selectedColors.includes(color)) {
      const updatedColors = selectedColors.filter((c) => c !== color);
      onChange?.(updatedColors);
    } else {
      onChange?.([...selectedColors, color]);
    }
  };

  return (
    <FormGroup>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: '16px',
          color: '#595079',
        }}
      >
        Color
      </Typography>

      {allVariantColors.map((color, i) => (
        <FormControlLabel
          key={`${color}${i}`}
          control={
            <Checkbox
              checked={selectedColors.includes(color)}
              onChange={() => handleColorChange(color)}
            />
          }
          label={color}
          sx={{
            '.MuiFormControlLabel-label': {
              fontSize: '16px',
              fontWeight: '500',
              color: '#595079',
            },
          }}
        />
      ))}
    </FormGroup>
  );
};
