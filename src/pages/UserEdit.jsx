import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { handleFile, useForm, useUploadImg } from '../services/customHooks'
import { userService } from '../services/user.service'
import { updateUser } from '../store/actions/user.actions'

export const UserEdit = ({ history }) => {
    const { loggedInUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()
    const [user, handleChange, setUser] = useForm(loggedInUser)
    const [imgPreview, setImgPreview] = useState('')

    useEffect(async () => {
        if (!loggedInUser) history.push('/')
        const user = await userService.getById(loggedInUser._id)
        setUser(user)
        setImgPreview(user.imgUrl)
    }, [])

    const uploadImg = async (ev) => {
        const fileEv = ev.target.files[0]
        const file = handleFile(fileEv, setImgPreview)
        console.log('file:', file);
    }
    const setUpdateUser = async (ev) => {
        ev.preventDefault();
        const newUser = { ...user }
        newUser.imgUrl = imgPreview
        // console.log(newUser);
        dispatch(updateUser(newUser));
    }

    return (
        <div className="container flex justify-center column user-edit">
            <img src={imgPreview} alt="user" />
            <form onSubmit={setUpdateUser} className="user-edit-form">
                <input
                    id="fileInput"
                    type="file"
                    name="imgUrl"
                    onChange={uploadImg}
                    value={''}
                    className="form-input"
                    accept="image/png, image/jpeg"
                />
                <label htmlFor="fullname">Full name:</label>
                <input type="text" name="fullname" placeholder="Full-name"
                    value={user.fullname} onChange={handleChange}
                />
                <button className="btn" type="submit">
                    Save
                </button>
            </form>
        </div>
    )
}
