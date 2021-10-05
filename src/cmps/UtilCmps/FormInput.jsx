import React from 'react'

export const FormInput = ({type , value , handleChange, name, label}) => {
    return (
        <div className="input-filed">
        <input className="form-input" type={type} name={name} placeholder=" "
            value={value} onChange={handleChange}
            autoComplete="off"
        />
        <label className="form-label" htmlFor={label}>{label}</label>
    </div>
    )
}
