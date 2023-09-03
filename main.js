const datePickerBtn = document.querySelector(".date-picker-button")
const datePickerModal = document.querySelector(".date-picker")
const datesContainer = document.querySelector(".date-picker-grid-dates")
const prevMonth = document.querySelector(".prev-month-button")
const nextMonth = document.querySelector(".next-month-button")
const currentMonth = document.querySelector(".current-month")
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

let todayDate = new Date()

function isMonthDifferent(date, currentSelectedDate) {
    return date.toLocaleString('default', { month: 'long' }) === currentSelectedDate.toLocaleString('default', { month: 'long' })
}

function isDateSame(date, currentSelectedDate) {
    const areTheySame = date.toDateString() === currentSelectedDate.toDateString()
    return areTheySame
}

function renderDateBtn(date, currentSelectedDate) {
    const button = document.createElement("button")
    button.classList.add("date")
    button.innerText = date.getDate()

    if (isDateSame(date, currentSelectedDate)) { button.classList.add("selected") }
    if (!isMonthDifferent(date, currentSelectedDate)) { button.classList.add("date-picker-other-month-date") }
    datesContainer.append(button)

    button.addEventListener("click", (e) => {
        if (e.target.className === "date date-picker-other-month-date") return
        toggleModal()
        todayDate = date
        setSelectedDate(todayDate)
    })
}

function getDatesInRange(startDate, endDate) {
    const dates = []
    while (startDate <= endDate) {
        dates.push(new Date(startDate))
        startDate.setDate(startDate.getDate() + 1)
    }
    return dates
}

function setDatePickerMonth(date) {
    currentMonth.innerText = dayjs(date).format('MMMM, YYYY')
}

function setUpDatePicker(currentSelectedDate) {
    setDatePickerMonth(currentSelectedDate)
    const firstDayOfWeek = new Date(dayjs(dayjs(currentSelectedDate).startOf('month')).startOf("week").$d)
    const lastDayOfWeek = new Date(dayjs(dayjs(currentSelectedDate).endOf('month')).endOf("week").$d)
    const datesInInterval = getDatesInRange(firstDayOfWeek, lastDayOfWeek)
    datesContainer.innerHTML = ""
    datesInInterval.forEach((date) => renderDateBtn(date, currentSelectedDate))
}

function toggleModal() {
    datePickerModal.classList.toggle("show")
}

///Second Entry Point
datePickerBtn.addEventListener("click", () => {
    toggleModal()
    setUpDatePicker(todayDate)
})

prevMonth.addEventListener("click", (e) => {
    todayDate = new Date(dayjs(todayDate).subtract(1, "month").$d)
    setDatePickerMonth(todayDate)
    setUpDatePicker(todayDate)
})

nextMonth.addEventListener('click', (e) => {
    const prevMonthDate = dayjs(todayDate).add(1, "month").$d
    todayDate = new Date(prevMonthDate)
    setDatePickerMonth(todayDate)
    setUpDatePicker(todayDate)
})

function setSelectedDate(date) {
    console.log(date)
    datePickerBtn.innerText = dayjs(date).format('MMMM D, YYYY')
}

//Entry poinit
setSelectedDate(todayDate)

