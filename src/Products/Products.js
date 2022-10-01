import React from 'react'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Products.css'
// import Card from 'react-bootstrap/Card';

function Products() {
  
  const [photos, setPhotos] = useState([])
  const BASE_URL = 'https://jsonplaceholder.typicode.com/users'

  const getPhotos = async ()=>{
    const response = await toast.promise(
      fetch(BASE_URL),
      {
        pending: 'Loading users',
        success: 'Users loaded',
        error: 'Failed to load users'
      }
    )
    setPhotos(await response.json())
  }
  useEffect(()=>{
    getPhotos()
  },[])
  return (
    <section id="products">
      <article className="cards">
        {photos.map((item, index) => {
          return (
            <div className="card" key={index}>
              <img src={`https://avatars.dicebear.com/api/avataaars/${item.id}.svg`} className="card-img-top" alt="random" />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Myself <span className='name'>{item.name}</span> i am a web developer you can contact me on my email below</p>
                <p className='email'><a href={`mailto: ${item.email}`}>{item.email}</a></p>
              </div>
            </div>
            
              // <Card style={{ width: '18rem' }} key={index}>
              // <Card.Img variant="top" src={item.avatar} />
              // <Card.Body className='card-body'>
              //   <Card.Title>{item.first_name}</Card.Title>
              //   <Card.Text>
              //   <p className="card-text">Myself <span className='name'>{item.first_name} {item.last_name}</span> i am a web developer you can contact me on my email below</p>
              //   <p className='email'><a href={`mailto: ${item.email}`}>{item.email}</a></p>
              //   </Card.Text>
              // </Card.Body>
              // </Card>
            )
        } )}
        <ToastContainer />
        </article>
    </section>
  )
}

export default Products