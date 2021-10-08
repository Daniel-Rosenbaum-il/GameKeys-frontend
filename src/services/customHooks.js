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
      const field = ev.target.name
      let value
      if (ev.target.type === 'number') {
        value = +ev.target.value
      } else {
        value = ev.target.value
      }
      setFields(prevFields => ({ ...prevFields, [field]: value }))
    },
    setFields
  ]
}


export const handleFile = (file, cb = () => { }) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    cb(reader.result)
  };
  reader.onerror = () => {
    console.error('AHHHHHHHH!!');
  };
}
export const useOnScreen = (options) => {
  const [ref, setRef] = useState(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)

    }, options)
    if (ref) {
      observer.observe(ref)
    }
    return () => {
      if (ref) {
        observer.unobserve(ref)
      }
    }
  }, [ref, options])
  return [setRef, visible]
}
