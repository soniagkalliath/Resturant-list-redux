import React, { useEffect } from 'react'
import { Row,Col,Spinner } from 'react-bootstrap'
import RestCard from './RestCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRestuarants, onNavigateNext, onNavigatePrev, search } from '../redux/restuarantSlice'

function Home() {
    const allRestuarant = useSelector((state)=>state.restuarantSlice)
    const restuarantArray = useSelector((state)=>state.restuarantSlice.restuarants)
    const restPerPage = useSelector((state)=>state.restuarantSlice.restPerPage)
    const currentPage = useSelector((state)=>state.restuarantSlice.currentPage)
    console.log(allRestuarant);
    const dispatch =useDispatch()
    useEffect(()=>{
        dispatch(fetchRestuarants())
    },[])
    const totalPages = Math.ceil(restuarantArray.length / restPerPage)
    // const pages = [...Array(restuarantArray.length+1).keys()].slice(1)
    const indexOfLastPage = currentPage * restPerPage
    const indexOfFirstPage = indexOfLastPage - restPerPage

    const visibleRestCard = restuarantArray.slice(indexOfFirstPage,indexOfLastPage)
    const naviagtePrev = ()=>{
        if(currentPage!=1){
            dispatch(onNavigatePrev())
        }
    }

    const naviagteNext =()=>{
        if(currentPage!=totalPages){
            dispatch(onNavigateNext())
        }
    }
  return (
    <>
        <div className="d-flex text-center w-75 m-5">
            <input onChange={(e)=>dispatch(search(e.target.value))} type="text" className='form-control' placeholder='Search restuarant by Cities' />
        </div>
        { allRestuarant.loading && <div> <Spinner animation="grow" variant="light" /> Loading...</div>}
        { !allRestuarant.loading && allRestuarant.error ? <div>  {allRestuarant.error}</div>:null}
        
        <Row>
          {
            visibleRestCard?.length>0?visibleRestCard?.map(restuarant=>(
                <Col className='px-5 py-3' sm={6} md={4} > 
                    <RestCard  restuarant={restuarant}/>
                </Col>
            ))
          :null
        }
        <div className='d-flex justify-content-center align-items-center'>
        <span onClick={naviagtePrev} className='me-2 border btn btn-outline-info rounded p-1'>Prev</span>
            {/* {pages.map(page=>(<span className='me-2 btn btn-outline-info border rounded p-1'>  {page} </span>))} */} <span className='me-2  p-1'>...</span>
            <span onClick={naviagteNext} className='me-2 border btn btn-outline-info rounded p-1'>Next</span>
        </div>
        <footer className='d-flex justify-content-center align-items-center mt-2' >
           Page {currentPage} of {totalPages}
        </footer>
        </Row>
    </>
  )
}

export default Home