import React from 'react'

export const FormInput = ({ type, value, handleChange, name, label, cols = '', rows = '' }) => {
    return (
        <div className="input-filed">
            {(type !== 'textarea') && < input className="form-input" type={type} name={name} placeholder=" "
                value={value} onChange={handleChange}
                autoComplete="off"
            />}
            {(type === 'textarea') && <textarea className="form-input" type={type} name={name} placeholder=" "
                value={value} onChange={handleChange}
                autoComplete="off"
                cols={cols} rows={rows} />}
            <label className="form-label" htmlFor={label}>{label}</label>
        </div>
    )
}
