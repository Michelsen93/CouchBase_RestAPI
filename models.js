//This class defines the model of the objects in the database

var ottoman = require("ottoman");

ottoman.bucket = require("./app").bucket;


//Structure for personss
var PersonModel = ottoman.model("Person", {


    timestamp: {
       type: "Date",
       default: function () { return new Date(); }
   },
    firstName: "string",
    lastName: "string",
    shooterId: "string",
    club: {ref: "Club"},
    mail: "string",
    phone: "string",
    scoreCards:[
        {
            ref: "Scorecard"
        }
    ]
});

//Structure for scorecard
var ScorecardModel = ottoman.model("Scorecard", {
    timestamp:{
        type: "Date",
        default: function(){return new Date();}
    },
    competitionNumber: "string",
    weaponClass: { ref: "WeaponClass"},
    shootingGroup: { ref: "WeaponGroup"},
    results: [
        {
            standplass: "string",
            hits: "integer",
            figures: "integer",
            bullseyes: "integer"
        }
    ],
    competitor: {ref: "Person"},
    completed: {
        type: "boolean",
        default: false
    }

});

var StandplassResultModel = ottoman.model("StandplassResult", {
    timestamp:{
        type: "Date",
        default: function(){return new Date();}
    },
    hits: "integer",
    figures: "integer",
    bullseyes: "integer"
})


//Structure for weaponClass
var WeaponClassModel = ottoman.model("WeaponClass", {
    timestamp:{
        type: "Date",
        default: function(){return new Date();}
    },
    description: "string",
    weaponName: "string"
    //Number of shots?

});

//Structure for weapongroup
var WeaponGroupModel = ottoman.model("WeaponGroup", {
    timestamp: {
        type: "Date",
        default: function () {
            return new Date();
        }
    },
    name: "string",
    description: "string"
});



//Structure for team
var TeamModel = ottoman.model("Team", {
    timestamp:{
        type: "Date",
        default: function(){return new Date();}
    },
    teamNumber: "string",
    competitionNumber: "string",
    startTime: "string",
    competitors:[
        {
        ref: "Person"
        }
    ]

});

//Structure for club
var ClubModel = ottoman.model("Club", {
    timestamp:{
        type: "Date",
        default: function(){return new Date();}
    },
    mail: "string",
    name: "string",
    address: "string",
    contactPersons:[
        {
            ref: "Person"
        }
    ],
    competitions: [
        {
            ref: "Competition"
        }
    ]
});

//Structure for Standplass
var StandplassModel = ottoman.model("Standplass", {
    timestamp:{
        type: "Date",
        default: function(){return new Date();}
    },
    name: "string",
    number: "string",
    maxHits: "integer",
    numberOfFigures: "integer",
    description: "string"
});

//Structure for
var CompetitionModel = ottoman.model("Competition", {
    timestamp:{
        type: "Date",
        default: function(){return new Date();}
    },
    standplasses: [
        {
            ref: "Standplass"
        }
    ],
    date:{
        type: "Date"
    },
    weaponGroups: [
        {
            ref: "WeaponGroup"
        }
    ],
    weaponClasses: [
        {
            ref: "WeaponClass"
        }
    ],
    competitionNumber: "string",
    club: "string",
    competitors:[
        {
            ref: "Person"
        }
    ],
    teams: [
        {
            ref: "Team"
        }
    ],
    referees:[
        {
            ref: "Person"
        }
    ],
    competitionLeaders:[
        {
            ref: "Person"
        }
    ],
    competitionType: "string",
    program: "string",
    location: "string",
        discipline: "string",
    active:{
        type: "boolean",
        default: true
    },
    scorecards: [
        {
            ref:"Scorecard"
        }
    ]
});




module.exports.PersonModel = PersonModel;
module.exports.ScorecardModel = ScorecardModel;
module.exports.CompetitionModel = CompetitionModel;
module.exports.StandplassModel = StandplassModel;
module.exports.WeaponClassModel = WeaponClassModel;
module.exports.ClubModel = ClubModel;
module.exports.TeamModel = TeamModel;
module.exports.WeaponGroupModel = WeaponGroupModel;

