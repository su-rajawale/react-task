import React, { useState } from 'react'
import './Dragndrop.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Finn from './adventure_images/finn.jpg'
import Princess from './adventure_images/princess.jpg'
import Marceline from './adventure_images/marceline.jpg'
import Gunter from './adventure_images/gunter.jpg'
import Jake from './adventure_images/jake.jpg'
import Simon from './adventure_images/simon.jpg'

const adventureChars = [
  {
    id: 1,
    name: 'Finn',
    thumb: Finn
  },
  {
    id: 2,
    name: 'Princess',
    thumb: Princess
  },
  {
    id: 3,
    name: 'Marceline',
    thumb: Marceline
  },
  {
    id: 4,
    name: 'Gunter',
    thumb: Gunter
  },
  {
    id: 5,
    name: 'Jake',
    thumb: Jake
  },
  {
    id: 6,
    name: 'Simon',
    thumb: Simon
  }
]

function Dragndrop() {

  const [chars, updateChars] = useState(adventureChars)

  const handleOnDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(chars)
    const [recordedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, recordedItem)

    updateChars(items)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>

      <Droppable droppableId='id'>

        {(provided) => (
          <ul className='adventure' {...provided.droppableProps} ref={provided.innerRef}>
            {chars.map(({ id, name, thumb }, index) => {
              return (
                <Draggable key={id} draggableId={id.toString()} index={index}>

                  {(provided) => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      <div className="card mb-3" style={{ maxWidth: 300 }}>
                        <div className="row g-0">
                          <div className="col-md-4">
                            <img src={thumb} className="img-fluid rounded-start" alt="thumb" />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h5 className="card-title">{name}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}

                </Draggable>
              )
            })}
            {provided.placeholder}
          </ul>
        )}
        
      </Droppable>

    </DragDropContext>
  )
}

export default Dragndrop