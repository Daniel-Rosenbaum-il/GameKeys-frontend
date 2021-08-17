import { useEffect, useState } from 'react'

export const useForm = (initialState, cb = () => { }) => {
  const [fields, setFields] = useState(initialState)

  useEffect(() => {
    cb(fields)
    // console.log(fields);
    // console.log(initialState);
  }, [fields])

  return [
    fields,
    function (ev) {
      console.log(ev);
      const field = ev.target.name
      const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
      console.log(value);
      setFields(prevFields => ({ ...prevFields, [field]: value }))
    },
    setFields
  ]
}
