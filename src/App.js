import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { useEffect } from 'react';
import { fetchData, setData, clearData, inputId, nextId, prevId } from './features/dataSlice';

const mapStateToProps = (state) => state.data

let debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args)
    }
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}

function App({ artId }) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)

  const renderImg = () => {
    if (data?.apiData) {
      return <img style={{ 'height': '80vh' }} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else {
      return <p>image here</p>
    }
  }

  const onInput = debounce(e => {
    dispatch(inputId(e.target.value))
  }, 500)

  useEffect(() => {
    dispatch(fetchData())
  }, [artId])

  return (
    <div className="App">
      <div>
        <button onClick={() => {
          // dispatch fetchData
          dispatch(fetchData())
        }}>Thunk!</button>
        <button onClick={() => {
          // dispatch reset
          dispatch(clearData())
        }}>Clear</button>
        <button onClick={() => {
          // dispatch next
          dispatch(nextId())
        }}>Next</button>
        <button onClick={() => {
          // dispatch prev
          dispatch(prevId())
        }}>Back</button>
      </div>
      <input onChange={onInput} />
      <div>
        {data?.artId}
        {renderImg()}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);