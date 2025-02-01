import React from 'react'
import { GetPost } from '../api/PostApi'
import { useState, useEffect } from 'react'
import "./user.css"

const UserDataGet = () => {

    const [getApiData, setApiData] = useState([])

    const getData = async () => {
        const response = await GetPost()
        const newResponse = response.data
        setApiData(newResponse)
    }

    console.log(1111111, getApiData)

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="container">
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
                            <div class="btn">
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </article>
                    ))}
                </main>
            </div>
        </>
    )
}

export default UserDataGet
