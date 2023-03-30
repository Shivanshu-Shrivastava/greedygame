import React, { useContext, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Table = ({ data, setData, keysData, setKeysData }) => {
  const [order, setOrder] = useState("ASC")
  const [remove, setRemove] = useState([])

  const sortToAscDSC = (name) => {
    if (order == "ASC") {
      const sorted = [...data].sort((a, b) =>
        // console.log(a, b);
        a.name || ''.toLowerCase() > b.name || ''.toLowerCase() ? 1 : -1

      )
      setData(sorted)
      setOrder("DSC")

    }
    else {
      const sorted = [...data].sort((a, b) =>
        a.name || ''.toLowerCase() < b.name || ''.toLowerCase() ? 1 : -1
      )
      setData(sorted)
      setOrder("ASC")
    }
  }

  // For Drag and Drop
  const handleDragEnd = (results) => {
    if (!results.destination) return;
    let tempdata = [...keysData]
    let [select] = tempdata.splice(results.source.index, 1)
    tempdata.splice(results.destination.index, 0, select)
    console.log(results, select, tempdata)
    setKeysData(tempdata)
  }

  // For hiding columns
  const removeValue = (value) => {
    const removeData = keysData.filter(ele => ele != value)
    setRemove(prev => {
      if (prev.includes(value)) {
        return prev.filter(ele => ele != value)
      } else {
        return prev.concat(value)
      }
    })
    setKeysData(removeData)
  }

  // For Adding in colomns
  const AddValue = (value) => {
    const AddData = keysData.concat(value)
    setRemove(prev => {
      if (prev.includes(value)) {
        return prev.filter(ele => ele != value)
      } else {
        return prev.concat(value)
      }
    })
    setKeysData(AddData)
  }
  return (
    <div>
      <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
        <Droppable droppableId='dropid'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} >
              {keysData ? keysData.map((val, index) => (

                <Draggable draggableId={val + index} index={index} key={index}>
                  {
                    (provided) => (
                      <div onClick={() => removeValue(val)} className='text-capitalize  alert alert-primary' ref={provided.innerRef} {...provided.draggableProps} >
                        <div className='d-flex align-items-center'>
                          <span className="material-symbols-outlined mr-2" {...provided.dragHandleProps}>
                            drag_handle
                          </span>{val} </div>
                      </div>
                    )
                  }
                </Draggable>)) : null}
              {provided.placeholder}
            </div>

          )}
        </Droppable>
      </DragDropContext>

      {/* For Adding colomns */}
      
      {remove.length!=0?<h5 className='fs-6'> Removed Items (Click on any block to display)</h5>:null}

      {remove ? remove.map((ele, index) => {
        return <div onClick={()=>AddValue(ele)} className='alert text-capitalize alert-dark'>{ele}</div>
      }) : null}


      <div class="table-responsive mt-3">
        <table class="table">
          <thead>
            <tr>
              {keysData.map(num => {

                return <th onClick={() => sortToAscDSC(num)} scope="col"><span className='d-flex text-capitalize justify-content-between align-items-center'>{num} <span className={order == "DSC" ? "material-symbols-outlined text-primary" : "material-symbols-outlined"}>arrow_upward</span></span> </th>

              })}

              <th scope="col"><span className='d-flex justify-content-between align-items-center'>Fill Rate <span className={order == "DSC" ? "material-symbols-outlined text-primary" : "material-symbols-outlined"}>arrow_upward</span></span></th>
              <th scope="col"><span className='d-flex justify-content-between align-items-center'>CTR <span className={order == "DSC" ? "material-symbols-outlined text-primary" : "material-symbols-outlined"}>arrow_upward</span></span> </th>
            </tr>
          </thead>
          <tbody>
            {data.length!=0 ? data.map((num, index) => {

              return <tr key={num.index}>
                {keysData ? keysData.map(val => {
                  if(val=='date'){
                    return <td>{num[val].slice(0,10)}</td>
                  }
                  return <td>{num[val]}</td>
                }) : null}

                <td>{Math.floor((num.requests / num.responses) * 100)}%</td>
                <td>{Math.floor((num.clicks / num.impressions) * 100)}%</td>
              </tr>

            }) : <h6 className='text-center'>Select Dates</h6>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
