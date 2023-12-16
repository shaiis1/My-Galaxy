import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "../hooks"
import { getPeople, peopleState, peopleType } from "../slices/peopleSlice"
import '../styles/table.css'
import '../styles/loader.css'
import loaderGif from '../assets/well-b-loader.gif'
import SortingComponent from "./sortingComponent"
import ModalComponent from "./modalComponent"

const PeopleComponent = () => {
    const { items, isLoading } = useAppSelector(peopleState)
    const [selectedItem, setSelectedItem] = useState<peopleType | null>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        let isMounted = true
        dispatch(getPeople())

        return () => {
            isMounted = false
        }
    }, [])

    const handleRowClick = (item: peopleType) => {
        setSelectedItem(item);
      }

    return(
        <div>
            {isLoading && (<div className="loader-container">
                    <img src={loaderGif} alt="Loading..." />
                </div>)}
            {items && items.length > 0 && (
            <SortingComponent<peopleType> data={items} sortKey="name">
            {(sortedItems, toggleSortDirection, sortDirection) => (
                <><button className="sort-btn" onClick={toggleSortDirection}>
                            Sort By Name: {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                        </button><div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Gender</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedItems.map((item: peopleType, index: number) => (
                                            <tr key={index} onClick={() => handleRowClick(item)}>
                                                <td>{item.name}</td>
                                                <td>{item.gender}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <ModalComponent 
                                    show={selectedItem != null}
                                    onClose={() => setSelectedItem(null)}
                                >
                                    <div>
                                    <p><b>Name:</b> {selectedItem?.name}</p>
                                    <p><b>Gender:</b> {selectedItem?.gender}</p>
                                    <p><b>Mass:</b> {selectedItem?.mass}</p>
                                    <p><b>Hair Color:</b> {selectedItem?.hair_color}</p>
                                    <p><b>Skin Color:</b> {selectedItem?.skin_color}</p>
                                    <p><b>Eye Color:</b> {selectedItem?.eye_color}</p>
                                    <p><b>Birth Year:</b> {selectedItem?.birth_year}</p>
                                    <p><b>HomeWorld:</b> <a href={selectedItem?.homeworld}>{selectedItem?.homeworld}</a></p>
                                    <p><b>URL:</b> <a href={selectedItem?.url} >{selectedItem?.url}</a></p>
                                    
                                    </div>
                                </ModalComponent>
                            </div></>
            )}
          </SortingComponent>)}
        </div>
    )
}

export default PeopleComponent

/*
    name: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string
    homeworld: string
    films: any[]
    species: any[]
    starships: any[]
    created: Date
    edited: Date
    url: string
     */