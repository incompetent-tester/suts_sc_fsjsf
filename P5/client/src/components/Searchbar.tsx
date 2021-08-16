import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../states/SearchSlice";

const Searchbar : React.FC = () => {
    const dispatch = useDispatch()
    const timer = useRef<NodeJS.Timeout | null>()

    const changeAction = (value  : string) => {
        if(timer.current){
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            dispatch(setSearch(value))
        },300)
    }

    return  <div className="searchbar">
        <input type="text" placeholder="Search.." onChange={(e) => changeAction(e.currentTarget.value)}/>
    </div>
}

export default Searchbar