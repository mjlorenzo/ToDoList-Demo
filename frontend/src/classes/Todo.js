// this file defines the standard representation of a to do item and a constructor
// this is mostly for convenience

export default class Todo
{
    // JS doesn't support function overloading so we'll explicitly test the first argument to allow
    // for construction from an existing object or separate pieces
    constructor(objOrID, desc, complete)
    {
        // detect if we're working with an existing anonymous object
        if (typeof(objOrID) === "object") {
            // copy the fields
            this.id = objOrID.id;
            this.desc = objOrID.desc;
            this.complete = objOrID.complete;
            // this is really what we want, not the ugly string returned by the API
            this.created = new Date(objOrID.created);
        }
        else {
            // otherwise construct an object from the arguments
            // note: since the ID is the database primary key, it will be ignored on submission
            this.id = objOrID;
            this.desc = desc;
            this.complete = complete;
            // note: the API will ignore this submitted value also
            this.created = new Date();
        }

        // bind the created date string function to this instance
        this.createdString = this.createdString.bind(this);
    }

    // function to return a short date and time string for the 'created' field
    createdString()
    {
        // create an empty string
        let dateStr = "";

        // grab values
        let hrs = this.created.getHours();
        let mins = this.created.getMinutes();
        let secs = this.created.getSeconds();
        let amOrPm = "AM";

        let month = this.created.getMonth() + 1;
        let day = this.created.getDate(); // interestingly not getDay()
        let year = this.created.getFullYear();

        // afternoon?
        if (hrs >= 12) {
            // subtract 12 from hours if it's 1PM or later
            hrs = hrs > 12 ? hrs - 12 : hrs;
            // set the string to PM
            amOrPm = "PM";
        }

        dateStr = dateStr + hrs + ":" + (mins < 10 ?  "0" : "") + mins + ":" + (secs < 10 ?  "0" : "")
                    + secs + amOrPm + " " + month + "/" + day + "/" + year;
        return dateStr;
    }
}