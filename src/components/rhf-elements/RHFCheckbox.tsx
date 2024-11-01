import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

// ----------------------------------------------------------------------

RHFCheckbox.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.any,
  checkedIcon: PropTypes.any,
  sx: PropTypes.any,
  label: PropTypes.any,
  checked: PropTypes.bool,
  tabIndex: PropTypes.number,
  onBlur: PropTypes.any,
  onChange: PropTypes.any,
  disabled: PropTypes.bool
};

export function RHFCheckbox({ name, icon, checkedIcon, checked, disabled, InputProps, onChange, tabIndex, sx, ...other }: any) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      disabled={disabled}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox 
              {...field}
              id={name}
              disabled={disabled} 
              checked={checked !== undefined ? !!checked : !!field.value} 
              tabIndex={tabIndex} 
              icon={icon} sx={sx} 
              onChange = {(event: any) => onChange ? onChange(field.onChange, event) : field.onChange(event)}
              checkedIcon={checkedIcon} 
            />
          )}
        />
      }
      sx={{
        justifyContent: "center",
        alignItems: "center",
        ...sx
      }}
      {...other}
    />
  );
}

// ----------------------------------------------------------------------

RHFMultiCheckbox.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};

export function RHFMultiCheckbox({ name, options, ...other }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option: any) =>
          field.value.includes(option) ? field.value.filter((value: any) => value !== option) : [...field.value, option];

        return (
          <FormGroup>
            {options.map((option: any) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={field.value.includes(option)}
                    onChange={() => field.onChange(onSelected(option))}
                  />
                }
                label={option}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}
