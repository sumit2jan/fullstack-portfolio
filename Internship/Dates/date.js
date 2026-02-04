// 1 saal date print krani hai har 25 din baad condition is sat colured green. start or end input lena hai.
function checkDates(){
    const startDate = $("#startDate").val();
    const endDate = $("#endDate").val();
    const output = $("#output");
    output.html("");
    if(!startDate || !endDate){
        alert("Fill Both Start Date and the End Date to start");
        return;
    }
    // coverting these into the date objects here
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = (end - start)/(1000 * 60 * 60 * 24);
    /*we are dividing the total milliseconds by the number of milliseconds in a single day.
    days = difference in miliiseconds/1000*60*60*24
    Here is what each number represents:
    1000: Converts Milliseconds = Seconds (1,000 ms in 1 second)
    60: Converts Seconds = Minutes (60 seconds in 1 minute)
    60: Converts Minutes = Hours (60 minutes in 1 hour)
    24: Converts Hours = Days (24 hours in 1 day) */
    if(diff <= 25){
        alert("Gap must be greater then 25 days Select Dates again.");
        return;
    }
    let count = 1;
    let currentDate = new Date(start); // we will remove the 25 days repeatily from this currentDate.
    while(currentDate <= end){
        const dateString = count +". "+currentDate.toDateString();
        const p = $("<p>").text(dateString);
        if (currentDate.getDay() === 6) p.addClass("saturday");
        output.append(p);
        count++;
        currentDate.setDate(currentDate.getDate() + 25);
    }
}












