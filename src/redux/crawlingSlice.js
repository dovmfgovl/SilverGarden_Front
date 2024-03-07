import { createSlice } from "@reduxjs/toolkit";

const crawlingSlice = createSlice({
    name: "crawlingSlice",
    initialState: {
        datas: [],
        filteredDatas: [],
        filters: {
            searchTitle: "",
            selectedCategory: "",
        },
    },
    reducers: {
        setDatas: (state, action) => {
            state.datas = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        setFilteredDatas: (state, action) => {
            const { datas, filters } = state;
            const filteredData = datas.filter((data) => {
                const isSearchMatch = !filters.searchTitle || data.title.includes(filters.searchTitle);
                const isCategoryMatch = !filters.selectedCategory || data.category === filters.selectedCategory;
                return isSearchMatch && isCategoryMatch;
            });
            state.filteredDatas = filteredData;
        },
    },
});

export const { setDatas, setFilters,setFilteredDatas } = crawlingSlice.actions;
// 새로운 액션 추가
export const setCalendarEvents = (data) => (dispatch) => {
    dispatch(setDatas(data));
    // 필요하다면 setFilteredEvents 등 다른 액션들을 디스패치할 수도 있음
};

export default crawlingSlice.reducer;
