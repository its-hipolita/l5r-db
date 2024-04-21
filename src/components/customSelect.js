import React from 'react';
import { Select, Option } from '@mui/joy';
import { XMarkIcon } from '@heroicons/react/24/solid';

const CustomSelect = ({ value, onChange, placeholder, options, clearValue }) => {
    return (
        <Select
            value={value}
            onChange={(e, newValue) => onChange(newValue)}
            placeholder={placeholder}
            {...(value && {
                endDecorator: (
                    <XMarkIcon
                        size="sm"
                        variant="plain"
                        color="neutral"
                        onMouseDown={(e) => {
                            e.stopPropagation();
                        }}
                        onClick={() => {
                            clearValue();
                        }}
                    />
                ),
                indicator: null,
            })}
        >
            {options.map((option, index) => (
                <Option key={index} value={option}>
                    {option}
                </Option>
            ))}
        </Select>
    );
};

export default CustomSelect;
