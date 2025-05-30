import { useState } from 'react';
import { Box, Typography, Slider } from '@mui/material';
import styles from './PriceRangeSlider.module.scss';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  onChange?: (values: [number, number]) => void;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  onChange,
}: PriceRangeSliderProps) => {
  const [values, setValues] = useState([min, max]);

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    const newValues = Array.isArray(newValue) ? newValue : [newValue];

    if (newValues.length === 1) {
      newValues.push(values[1]);
    }

    if (activeThumb === 0 && newValues[0] > values[1]) {
      newValues[0] = values[1];
    } else if (activeThumb === 1 && newValues[1] < values[0]) {
      newValues[1] = values[0];
    }

    const safeNewValues: [number, number] = [newValues[0], newValues[1]];

    setValues(safeNewValues);

    if (onChange) {
      onChange(safeNewValues);
    }
  };

  return (
    <Box sx={{ width: '100%', marginTop: '25px' }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: '14px',
          color: '#595079',
        }}
      >
        Price
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Slider
          value={values}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          getAriaLabel={(index) =>
            index === 0 ? 'Minimum price' : 'Maximum price'
          }
          aria-labelledby="range-slider"
          min={min}
          max={max}
          step={1}
          sx={{
            marginLeft: '10px',
            marginRight: '10px',
            '& .MuiSlider-thumb': {
              color: '#595079',
            },
            '& .MuiSlider-track': {
              color: '#595079',
              backgroundColor: '#595079',
            },
            '& .MuiSlider-rail': {
              color: '#595079',
              opacity: 0.5,
            },
          }}
        />
      </Box>

      <div className={styles.container}>
        <p className={styles.value}>$0</p>
        <p className={styles.value}>$1000</p>
      </div>
    </Box>
  );
};
