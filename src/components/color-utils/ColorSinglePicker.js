import PropTypes from 'prop-types';
// @mui
import { Radio, RadioGroup } from '@mui/material';
//
import Icon from './Icon';

// ----------------------------------------------------------------------

const ColorSinglePicker = ({ colors, ...other }) => (
  <RadioGroup row {...other}>
    {colors.map((color) => {
      const whiteColor = color === '#FFFFFF' || color === 'white';

      return (
        <Radio
          key={color}
          value={color}
          color="default"
          icon={<Icon whiteColor={whiteColor} />}
          checkedIcon={<Icon checked whiteColor={whiteColor} />}
          sx={{
            color,
            '&:hover': { opacity: 0.72 },
            '& svg': { width: 12, height: 12 },
          }}
        />
      );
    })}
  </RadioGroup>
);

ColorSinglePicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
};

ColorSinglePicker.defaultProps = {
  colors: [],
};

export default ColorSinglePicker;
