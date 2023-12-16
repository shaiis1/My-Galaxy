import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getPlanets, planetsState, planetType } from "../slices/planetsSlice"
import '../styles/table.css'
import '../styles/loader.css'
import loaderGif from '../assets/well-b-loader.gif'
import SortingComponent from "./sortingComponent"
import ModalComponent from "./modalComponent"

const PlanetsComponent = () => {
    const { items, isLoading } = useAppSelector(planetsState)
    const [selectedItem, setSelectedItem] = useState<planetType | null>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        let isMounted = true
        dispatch(getPlanets())

        return () => {
            isMounted = false
        }
    }, [])

    const handleRowClick = (item: planetType) => {
        setSelectedItem(item);
      }

    return(
        <div>
            {isLoading && (<div className="loader-container">
                    <img src={loaderGif} alt="Loading..." />
                </div>)}
            {items && items.length > 0 && (
            <SortingComponent<planetType> data={items} sortKey="name">
            {(sortedItems, toggleSortDirection, sortDirection) => (
                <><button className="sort-btn" onClick={toggleSortDirection}>
                            Sort By Name: {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                        </button><div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Rotation Period</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedItems.map((item: planetType, index: number) => (
                                            <tr key={index} onClick={() => handleRowClick(item)}>
                                                <td>{item.name}</td>
                                                <td>{item.rotation_period}</td>
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
                                    <p><b>Rotation Period:</b> {selectedItem?.rotation_period}</p>
                                    <p><b>Orbital Period:</b> {selectedItem?.orbital_period}</p>
                                    <p><b>Diameter:</b> {selectedItem?.diameter}</p>
                                    <p><b>Climate:</b> {selectedItem?.climate}</p>
                                    <p><b>Gravity:</b> {selectedItem?.gravity}</p>
                                    <p><b>Terrain:</b> {selectedItem?.terrain}</p>
                                    <p><b>Surface Water:</b> {selectedItem?.surface_water}</p>
                                    <p><b>Population:</b> {selectedItem?.population}</p>
                                    <p><b>URL:</b> <a href={selectedItem?.url} >{selectedItem?.url}</a></p>
                                    </div>
                                </ModalComponent>
                            </div></>
            )}
          </SortingComponent>)}
        </div>
    )
}

export default PlanetsComponent

/**
     name: string
    rotation_period: string
    orbital_period: string
    diameter: string
    climate: string
    gravity: string
    terrain: string
    surface_water: string
    population: string
    residents: any[]
    films: any[]
    created: Date
    edited: Date
    url: string
 */