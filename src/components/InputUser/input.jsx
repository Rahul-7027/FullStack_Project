import React, { act, useEffect, useState } from 'react'
import "./input.css"
import { AddPost, PutPost } from '../../api/PostApi'

const input = ({ getApiData, setApiData, setEditApiData, editApiData }) => {

    const [data, setData] = useState({
        title: "",
        body: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    }


    const isEmpty = Object.keys(editApiData).length === 0

    useEffect(() => {
        editApiData && setData({
            title: editApiData.title || "",
            body: editApiData.body || ""
        })
    }, [editApiData])

    const AddPostData = async () => {
        try {
            const dataPost = await AddPost(data);
            if (dataPost.status === 201) {
                setApiData([...getApiData, dataPost.data]);
                console.log("Post added successfully:", dataPost.data);
                setData({ body: "", title: "" })
            }
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    const UpdateDataPost = async () => {
        try {
            const response = await PutPost(editApiData.id, data);
            if (response.status === 200) {
                setApiData((prev) =>
                    prev.map((element) =>
                        element.id === editApiData.id ? response.data : element
                    )
                );
                setData({ title: "", body: "" }); // Clear form after update
            }
        } catch (error) {
            console.log("Error updating post:", error);
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(data)
        const action = event.nativeEvent.submitter.value
        if (action === "Add") {
            AddPostData()
        }
        else if (action === "Edit") {
            UpdateDataPost()
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter Your Title' value={data.title} onChange={handleChange} name="title" id="title" /><br /><br /><br />
                <input type="text" placeholder='Enter Your body' value={data.body} onChange={handleChange} name="body" id="body" /><br />
                <button value={isEmpty ? "Add" : "Edit"} type="submit">{isEmpty ? "Add" : "Edit"}</button>
            </form>
        </div>
    )
}

export default input;
  