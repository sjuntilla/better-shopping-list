import React, {useState, useEffect} from 'react';
import './index.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus} from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [items,
        setItems] = useState([]);

    const [totalItemCount, setTotalItemCount] = useState(6);

    const [inputValue, setInputValue] = useState('');

    const saveToLocalStorage = (items) => {
      localStorage.setItem('item-list', JSON.stringify(items));
    }

    useEffect(() => {
      const allItems = JSON.parse(localStorage.getItem('item-list'))
      setItems(allItems); 
    }, []);

    const handleAddButtonClick = () => {
      const newItem= {
        itemName: inputValue,
        quantity: 1,
        isSelected: false 
      };

      const newItems = [...items, newItem];
      setItems(newItems);
      setInputValue('');
      saveToLocalStorage(newItems);
      calculateTotal();
    }

    const toggleComplete = (index) => {
      const newItems=[...items];

      newItems[index].isSelected =! newItems[index].isSelected;
      setItems(newItems); 
    }

    const handleQuantityIncrease = (index) => {
      const newItems = [...items];
      newItems[index].quantity++;
      setItems(newItems);
           saveToLocalStorage(newItems);
      calculateTotal();
    }

    const handleQuantityDecrease = (index) => {
      const newItems = [...items];
      newItems[index].quantity--;
      setItems(newItems);
           saveToLocalStorage(newItems);
      calculateTotal();
    }

    const calculateTotal = () => {
      const totalItemCount=items.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
      setTotalItemCount(totalItemCount);
    }

    return (
        <div className='app-background'>
            <div className='main-container'>
                <div className='add-item-box'>
                    <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...'/>
                    <FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick() }/>
                </div>
                <div className='item-list'>
                  {items.map((item, index) => (
                    <div className='item-container'>
                      <div className='item-name' onClick={() => toggleComplete(index)}>
                        {item.isSelected ? (
                          <>
                          <FontAwesomeIcon icon = {faCheckCircle} />
                          <span className='completed'>{item.itemName}
                          </span>
                          </>
                        ) : (
                          <>
                          <FontAwesomeIcon icon={faCircle} />
                          <span>{item.itemName}</span>
                          </>
                        )}
                      </div>
                        <div className='quantity'>
                            <button>
                                <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
                            </button>
                            <span>
                                {item.quantity}
                            </span>
                            <button>
                                <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
                            </button>
                        </div>
                    </div>
                    ))}
                </div>
                <div className='total'>Total: {totalItemCount}</div>
            </div>
        </div>
    )
};

export default App;
