import React, { useEffect } from 'react'
import { Row,Col } from 'react-bootstrap'
import RestCard from './RestCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRestuarants, search } from '../redux/restuarantSlice'

function Home() {
    var allRestuarant = useSelector((state)=>state.restuarantSlice.restuarants)
    const dispatch =useDispatch()
    useEffect(()=>{
        dispatch(fetchRestuarants())
    },[])
    // console.log(allRestuarant);
    const searchRest = (place)=>{
        let result =[]
        allRestuarant?.forEach(item=>{
            if(item.neighborhood.trim().toLowerCase().includes(place.trim().toLowerCase())){
                result.push(item);
            }
        })
        dispatch(search(result))
    }
  return (
    <>
        {/* <div className="d-flex text-center w-75 m-5">
            <input onChange={(e)=>searchRest(e.target.value)} type="text" className='form-control' placeholder='Search restuarant by Cities' />
            <button>search</button>
        </div> */}
        <Row>
          {
            allRestuarant?.length>0?allRestuarant?.map(restuarant=>(
                <Col className='px-5 py-3' sm={6} md={4} > 
                    <RestCard  restuarant={restuarant}/>
                </Col>
            ))
          :null
        }
        </Row>
    </>
  )
}

export default Home