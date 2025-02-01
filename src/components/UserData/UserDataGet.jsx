import React from 'react'
import { DeletPost, GetPost, PutPost } from '../../api/PostApi'
import { useState, useEffect } from 'react'
import "./user.css"
import Input from "../InputUser/input"

const UserDataGet = () => {

    const [getApiData, setApiData] = useState([])
    const [editApiData, setEditApiData] = useState({})

    const getData = async () => {
        const response = await GetPost()
        const newResponse = response.data
        setApiData(newResponse)
    }

    // console.log(1111111, getApiData)

    useEffect(() => {
        getData()
    }, [])


    // functionality of Delete Method 
    const handleDelete = async (id) => {

        try {
            let deleteData = await DeletPost(id)
            if (deleteData.status === 200) {
                const UpdatedData = getApiData.filter((currValue) => {
                    return currValue.id != id
                })
                setApiData(UpdatedData)
            }
            console.log(deleteData)
        } catch (error) {
            console.log(error)
        }

    }


    const handleEdit = (element) => setEditApiData(element)


    return (
        <>
            <div className="container">
                <Input getApiData={getApiData} setApiData={setApiData} setEditApiData={setEditApiData} editApiData={editApiData} />
                <main className="grid">
                    {getApiData.map((element, index) => (
                        <article key={element.id}>

                            <div className="text" >
                                <ul>
                                    <li>{element.id}</li>
                                </ul>
                                <h3>{element.title}</h3>
                                <p>{element.body}</p>
                            </div>
                            <div className="btn">
                                <button onClick={() => handleEdit(element)}>Edit</button>
                                <button onClick={() => handleDelete(element.id)}>Delete</button>
                            </div>
                        </article>
                    ))}
                </main>
            </div>
        </>
    )
}

export default UserDataGet
