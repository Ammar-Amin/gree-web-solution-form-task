import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const data = [
        {
            id: "1",
            name: "Google Pixel 6 Pro",
            data: {
                color: "Cloudy White",
                capacity: "128 GB"
            }
        },
        {
            id: "2",
            name: "Apple iPhone 12 Mini, 256GB, Blue",
            data: null
        },
        {
            id: "3",
            name: "Apple iPhone 12 Pro Max",
            data: {
                color: "Cloudy White",
                GB: 512
            }
        },
        {
            id: "4",
            name: "Apple iPhone 11, 64GB",
            data: {
                price: 389.99,
                color: "Purple"
            }
        },
        {
            id: "5",
            name: "Samsung Galaxy Z Fold2",
            data: {
                price: 689.99,
                color: "Brown"
            }
        },
        {
            id: "6",
            name: "Apple AirPods",
            data: {
                generation: "3rd",
                price: 120
            }
        },
        {
            id: "7",
            name: "Apple MacBook Pro 16",
            data: {
                year: 2019,
                price: 1849.99,
                // CPU model: "Intel Core i9",
                // Hard disk size: "1 TB",
            }
        },
        {
            id: "8",
            name: "Apple Watch Series 8",
            data: {
                // Strap Colour: "Elderberry",
                // Case Size: "41mm"
            }
        },
        {
            id: "9",
            name: "Beats Studio3 Wireless",
            data: {
                Color: "Red",
                Description: "High-performance wireless noise cancelling headphones"
            }
        },
        {
            id: "10",
            name: "Apple iPad Mini 5th Gen",
            data: {
                Capacity: "64 GB",
                // Screen size: 7.9
            }
        },
        {
            id: "11",
            name: "Apple iPad Mini 5th Gen",
            data: {
                Capacity: "254 GB",
                // Screen size: 7.9
            }
        },
        {
            id: "12",
            name: "Apple iPad Air",
            data: {
                Generation: "4th",
                Price: "419.99",
                Capacity: "64 GB"
            }
        },
        {
            id: "13",
            name: "Apple iPad Air",
            data: {
                Generation: "4th",
                Price: "519.99",
                Capacity: "256 GB"
            }
        }
    ]

    const fetchSuggestions = debounce(async (searchQuery) => {
        if (searchQuery.trim() === '') {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        try {
            // const response = await axios.get(`https://api.restful-api.dev/objects?q=${searchQuery}`);
            // console.log(response)
            // setSuggestions(response.data);

            let newArr = data.filter((item) => item.name.includes(searchQuery))
            setSuggestions(newArr)

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }, 100); // delay

    // const fetchSuggestions = async (searchQuery) => {
    //     if (searchQuery === '') {
    //         setSuggestions([])
    //         return
    //     }
    //     setIsLoading(true)
    //     try {
    //         const response = await axios.get(`https://api.restful-api.dev/objects?${searchQuery}`)
    //         setSuggestions(response.data)
    //     } catch (err) {
    //         console.log(err)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }


    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        fetchSuggestions(value);
    };

    return (
        <div className='w-full min-h-screen'>
            <div className='flex justify-center'>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search by name..."
                    className='px-4 py-2 bg-slate-700 rounded-lg my-20'
                />
            </div>
            {isLoading && <p className='text-center'>Loading...</p>}
            <ul className='w-full max-w-7xl mx-auto flex flex-wrap gap-5'>
                {suggestions &&
                    suggestions.length > 0 &&
                    suggestions.map((item) => (
                        <li key={item.id}>
                            <div className='mt-4 flex gap-4 rounded-xl shadow-sm p-6 bg-slate-800'>
                                <div className="space-y-2">
                                    <h3 className="text-[22px] font-semibold">{item.name}</h3>
                                    <span className="leading-8 text-gray-500 font-normal">{item.data?.color}</span>
                                    <span className="leading-8 text-gray-500 font-normal">{item.data?.capacity}</span>
                                </div>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default SearchBar;
