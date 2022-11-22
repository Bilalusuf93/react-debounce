import { useEffect, useState, useRef } from 'react'
import { useDebounce } from './hooks/useDebounce';
import TextBox from './components/TextBox';
import Skeleton from './components/Skeleton';
import { getCharacter } from './Utils/getCharacters'
import './Styles/app.scss';
function App() {
  const [query, setQuery] = useState('')
  const [listing, setListing] = useState('')
  const [loading, setLoading] = useState(false)
  const controllerRef = useRef()
  const searchQuery = useDebounce(query, 2000);
  const controller = new AbortController();
  controllerRef.current = controller;

  async function searchCharacter() {
    try {
      setListing('')
      setLoading(true)
      const data = await getCharacter(searchQuery, controllerRef.current?.signal)
      setListing(data.results)
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setQuery('')
    }

  }
  useEffect(() => {
    setListing('')
    if (searchQuery || query.length < 0) searchCharacter();
    return cancelSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  const cancelSearch = () => {
    controllerRef.current.abort();
  }

  return (
    <div className="App">

      <div className='debounce-container'>
        <div className='debounce-container__heading'>Search Rick and Morty Character
          <span>(With debounce custom hook)</span></div>
        <div className='debounce-container__searchbox'>
          <TextBox className='debounce-container__searchbox-input' mb={10} onChange={(e) => setQuery(e.target.value)} value={query} />
        </div>
        {loading && <div className='debounce-container__card'>
          {[...new Array(6)].map((i, x) => (<Skeleton className='debounce-container__card-items skeleton' key={x} style={{ height: '300px', width: '250px' }} />))}
        </div>}
        {listing && <div className='debounce-container__card'>
          {listing?.map((items, i) => (
            <div className='debounce-container__card-items' key={items.id}>
              <div className='debounce-container__image-container'>
                <img className='debounce-container__image' alt='' src={items.image} />
              </div>
              <div className='debounce-container__name'>
                {items.name}
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}

export default App;
