import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    PayloadAction
  } from '@reduxjs/toolkit'
import { GetRequest } from '../apis/apiGenerics'
import { RootState } from '../store'

  export interface planetType {
    id: string
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
  }

  export const planetAdapter = createEntityAdapter<planetType>({
    selectId: (planets) => planets.url
  })

  export const planetSelectors =
  planetAdapter.getSelectors<RootState>((state) => state.planets)

  export const { selectAll, selectById, selectEntities, selectTotal } =
  planetSelectors

  export const getPlanets = createAsyncThunk(
    'planets/getPlanets', async() => {
      try{
        const res = await GetRequest('entities/getEntity?entity=2')
        return res.data
      }
      catch(err: any){
        return err.message
      }
    }
  )

  const planetsSlice = createSlice({
    name: 'planets',
    initialState: planetAdapter.getInitialState({
      isLoading: false,
      error: '',
      items: <any>[],
      hasNextPage: false,
      currentPage: 1
    }),
    reducers: {
    },
    extraReducers(builder) {
      builder
      .addCase(getPlanets.fulfilled, (state, action: PayloadAction<any>) => {
        const newPlanets = action.payload
        const existingPlanets = new Set(state.items.map((p: { url: any }) => p.url))
        newPlanets.forEach((planet: any) => {
          if(!existingPlanets.has(planet.url)){
            state.items.push(planet)
            existingPlanets.add(planet.url)
          }
        });
        state.isLoading = false
      })
      .addCase(getPlanets.pending, (state, action: PayloadAction<any>) => {
        state.isLoading = true
      })
      .addCase(getPlanets.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
      })
    }
  })

export const planetsState = (state: RootState) => state.planets
export default planetsSlice.reducer
