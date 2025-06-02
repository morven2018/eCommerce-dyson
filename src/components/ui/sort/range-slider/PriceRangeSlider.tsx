import { useState, useEffect } from 'react';
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
  const [scaleValues, setScaleValues] = useState<number[]>([0, 0]);

  useEffect(() => {
    if (scaleValues[0] === 0 && scaleValues[1] === 0) {
      const newValues = [min, max];
      setValues(newValues);
      setScaleValues(newValues);
    }
  }, [min, max, scaleValues]);

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    const newValues = Array.isArray(newValue)
      ? ([...newValue] as [number, number])
      : ([newValue, values[1]] as [number, number]);

    if (activeThumb === 0) {
      newValues[0] = Math.min(newValues[0], values[1]);
    } else if (activeThumb === 1) {
      newValues[1] = Math.max(newValues[1], values[0]);
    }

    setValues(newValues);

    if (onChange) {
      onChange(newValues);
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
          min={scaleValues[0]}
          max={scaleValues[1]}
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
        <p className={styles.value}>${scaleValues[0]}</p>
        <p className={styles.value}>${scaleValues[1]}</p>
      </div>
    </Box>
  );
};
