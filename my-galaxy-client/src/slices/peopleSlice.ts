import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    PayloadAction
  } from '@reduxjs/toolkit'
import { GetRequest } from '../apis/apiGenerics'
import { RootState } from '../store'

  export interface peopleType {
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
  }

  export const peopleAdapter = createEntityAdapter<peopleType>({
    selectId: (people) => people.url
  })

  export const peopleSelectors =
  peopleAdapter.getSelectors<RootState>((state) => state.people)

  export const { selectAll, selectById, selectEntities, selectTotal } =
  peopleSelectors

  export const getPeople = createAsyncThunk(
    'people/getPeople', async() => {
      try{
        const res = await GetRequest('entities/getEntity?entity=1')
        return res.data
      }
      catch(err: any){
        return err.message
      }
    }
  )

  const peopleSlice = createSlice({
    name: 'planets',
    initialState: peopleAdapter.getInitialState({
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
      .addCase(getPeople.fulfilled, (state, action: PayloadAction<any>) => {
        const newPeople = action.payload
        const existingPeople = new Set(state.items.map((p: { url: any }) => p.url))
        newPeople.forEach((people: any) => {
          if(!existingPeople.has(people.url)){
            state.items.push(people)
            existingPeople.add(people.url)
          }
        });
        state.isLoading = false
      })
      .addCase(getPeople.pending, (state, action: PayloadAction<any>) => {
        state.isLoading = true
      })
      .addCase(getPeople.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload
      })
    }
  })

export const peopleState = (state: RootState) => state.people
export default peopleSlice.reducer
