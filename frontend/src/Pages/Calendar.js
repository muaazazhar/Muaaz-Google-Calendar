import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createAllDayEvent, createEvents, createTime, getCurrentDate } from "../Utils/events";

const Calendar = () => {
    var arr2 = [];
    var arr1 = [];
    const [timelyEvents, setTimelyEvents] = useState(null),
        data = useSelector((state) => state.eventReducer),
        [allDayEvents, setAllDayEvents] = useState([]),
        [once, setOnce] = useState(true),
        [date, setDate] = useState('')

    const setData = async () => {
        console.log(data.events);
        data.events.forEach((event) => {
            if (event.allDay) {
                arr1.push(event)
            } else {
                arr2.push(event)
            }
        })
        setTimelyEvents(arr2)
        setAllDayEvents(arr1)
    }

    useEffect(() => {
        if(data.events && once){
            setDate(getCurrentDate())
            //Making sure API is called only once
            setOnce(false)
            //Generate timetable
            createTime()
            
            setData()
        }
        //Create Daily events
        createAllDayEvent(allDayEvents);
        //Creating timely events
        // console.log(timelyEvents);
         createEvents(timelyEvents);
    },[allDayEvents, timelyEvents])

    return (
        <div className="main">
            <div id="date">
                <p id="dt">{date}</p>
            </div>
            <div id="daily">

            </div>
            <div id="time">
                <div id="AM">
                    <span id="red">AM</span>
                    <div id="amclck" className="clck">
                    </div>
                </div>
                <div id="PM">
                    <span id="blue">PM</span>
                    <div id="pmclck" className="clck">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;