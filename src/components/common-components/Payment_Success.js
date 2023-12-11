import React, { useEffect, useState } from 'react'
import '../../assets/css/paymentSuccess.css'
import logo from '../../assets/img/logo/logo.jpg'
import { axiosInstance, userInfo } from '../../constants/utils'
import { userRoutes } from '../../constants/constant'
import { useSearchParams } from 'react-router-dom' 
import { PLAN } from '../../constants/constant'

const Payment_Success = () => {
  const pathname = userRoutes[userInfo?.userType].path
  const [searchParams] = useSearchParams()
  const trxId = searchParams.get('trxId')
  const [ transaction, setTransaction ] = useState({})

  useEffect(() => {
    if( !userInfo ) window.location.replace('/')
    if( trxId ) getTransaction()
  }, [])

  const getTransaction = async () => {
    try{
      let { data } = await axiosInstance.get(`/common/transaction/${trxId}`)
      console.log(data.transaction)
      setTransaction(data.transaction)
    } catch(err){ console.log(err) }
  }

  const membershipText = ( type ) => {
    if( type === PLAN.month ) return '1 month membership plan';
    if( type === PLAN.quater ) return '3 month membership plan';
    if( type === PLAN.halfYear ) return '6 month membership plan';
    if( type === PLAN.year ) return '1 year membership plan';

  }

  return (
    <>
      <div className="box"></div>
      <div className="d-flex justify-content-center bg-dark">
        <div className="receipt border mb-5 mt-5">
          <header className="receipt__header">
            <p className="receipttitle">
              <img style={{ width: "200px" }} src={logo} alt="" />
            </p>
            <p className="receipt__date">{new Date().toLocaleString() }</p>
          </header>
          <dl className="receipt__list">
            <div className="receipt__list-row">
              <dt className="receipt__item">{ membershipText(transaction.type) }</dt>
              <dd className="receipt__cost">&#8377; { transaction.amount }</dd>
            </div>
            <div className="receipt__list-row receipt__list-row--total">
              <dt className="receipt__item">Total</dt>
              <dd className="receipt__cost"> &#8377; { transaction.amount }</dd>
            </div>
            <button className='btn btn-primary mt-4 w-100 shadow-none' onClick={() => window.location.replace(pathname)  }>Back To Dashboard</button>
          </dl>
        </div>
      </div>
    </>
  );
}

export default Payment_Success