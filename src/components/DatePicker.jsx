import React,{useState} from 'react'

const DatePicker = ({setFromdate,setTodate}) => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const submit = (e)=>{
      e.preventDefault()
      setFromdate(from)
      setTodate(to)

  }
  return (
    <form onSubmit={submit} className='d-flex align-items-center'>
      <div className="mb-3 pl-5 w-25">
        <label for="exampleInputEmail1" className="form-label">From</label>
        <input onChange={(e)=>setFrom(e.target.value)} type="date" min='2021-05-01' max='2021-05-31' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3 px-2 w-25">
        <label for="exampleInputEmail1" className="form-label">To</label>
        <input onChange={(e)=>setTo(e.target.value)} type="date" min='2021-05-01' max='2021-05-31' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <div style={{'marginTop':11+'px'}} className=" w-25">
        <button type='submit'  className="btn btn-primary ">
        Search
      </button>
      </div>
      
    </form>
  )
}

export default DatePicker