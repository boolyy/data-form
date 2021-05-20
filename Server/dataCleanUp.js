export default class dataCleanUp {
    removeNumericJurisdictions(data){ //removes numeric jurisdictions from get
        for (var i = 0; i < data.length; i++){
            if(!(isNaN(data[i].jurisdiction))){ //returns true if the jurisdiction is a number
                data.splice(i,1)
                i--
            }
        }
        return data
    }
}