var PersonModel = require("./models").PersonModel;
var CompetitionModel = require("./models").CompetitionModel;
var StandplassModel = require("./models").StandplassModel;
var WeapondClassModel = require("./models").WeaponClassModel;
var ClubModel = require("./models").ClubModel;
var TeamModel = require("./models").TeamModel;
var WeaponGroupModel = require("./models").WeaponGroupModel;
var ScoreCardModel = require("./models").ScorecardModel;


var appRouter = function(app) {


    //TODO - load arrays for getters
    //GET

    //Returns all people, works
    app.get("/person", function (req, res) {
        PersonModel.find({}, function(error, people){
            if(error){
                return res.status(400).send(error);
            }
            res.send(people);
        });
    });

    app.get("/scoreCard", function (req, res) {
        ScoreCardModel.find({},{load: ["competitor"]} ,function(error, people){
            if(error){
                return res.status(400).send(error);
            }
            res.send(people);
        });
    });

    /**
     * Gets all clubs
     */
    app.get("/club", function (req, res) {
        ClubModel.find({}, function(error, people){
            if(error){
                return res.status(400).send(error);
            }
            res.send(people);
        });
    });

    /**
     * Gets club by name in params
     */
    app.get("/club/findByName/:name", function (req, res) {
        ClubModel.find({name: req.params.name},{load: ["contactPersons"]},  function(error, person){
            if(error){
                return res.status(400).send(error);
            }
            res.send(person);
        });
    });




    //Returns a person by email. works
    app.get("/person/findByEmail/:mail", function (req, res) {
        PersonModel.find({mail: req.params.mail}, {load: ["scoreCards"]},  function(error, person){
            if(error){
                return res.status(400).send(error);
            }
            res.send(person);
        });
    });



    app.get("/scorecard/getByCompetitionNumber/:competitionNumber", function(req, res){
       ScoreCardModel.find({competitionNumber: req.params.competitionNumber},{load: ["*"]}, function (error, scorecards){
           if(error){
               console.log("feil")
               return res.status(400).send(error);
           }
           res.send(scorecards);
       });
    });


    //Gets all competitions. works
    app.get("/competition", function (req, res){
        //Should maybe load stuff
        CompetitionModel.find({},{load: ["competitors", "scorecards"]}, function(error, competitions){
            if(error){
                return res.status(400).send(error);
            }
            res.send(competitions);
        });
    });

    //Gets competition by competitionNumber, works
    app.get("/competition/findByCompetitionNumber/:competitionNumber", function (req, res) {
        CompetitionModel.find({competitionNumber: req.params.competitionNumber},{load: ["competitors"]}, function(error, competition){

            if(error){
                return res.status(400).send(error);
            }
            res.send(competition[0]);
        });
    });

    //Gets weapongroups
    app.get("/weaponGroup", function (req, res) {
        WeaponGroupModel.find({}, function (error, weaponGroup) {
            if(error){
                return res.status(400).send(error);
            }
            res.send(weaponGroup);
        });
    });

    //Gets weaponClass
    app.get("/weaponClass", function (req, res) {
        WeapondClassModel.find({}, function (error, weaponClass) {
            if(error){
                return res.status(400).send(error);
            }
            res.send(weaponClass);
        });
    });


    //POST

    //Adds a person works
    app.post("/person", function(req, res) {
        var person = new PersonModel({

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mail: req.body.mail,
            shooterId: req.body.shooterId,
            phone: req.body.phone
        });
        person.save(function (error, result) {
            if(error){
                return res.status(400).send(error);
            }
            return result;
        });
    });

    app.post("/standplass", function(req, res) {
        var standplass = new StandplassModel({
            name: req.body.name,
            number: req.body.number,
            maxHits: req.body.maxHits,
            numberOfFigures: req.body.numberOfFigures,
            description: req.body.description

        });
        standplass.save(function (error, result) {
            if(error){
                return res.status(400).send(error);
            }
            return result;
        });
    });



    //Saves competition without any references yet
    //References will be saved afterwards works
    app.post("/competition", function (req, res) {

        var competition = new CompetitionModel({
            competitionType: req.body.competitionType,
            program: req.body.program,
            location: req.body.location,
            discipline: req.body.discipline,
            competitionNumber: req.body.competitionNumber,
            date: req.body.date,
            club: req.body.club,
            scorecards: []
        });
        competition.save(function (error, result) {
            if(error){
                return res.status(400).send(error);
            }
            return result;
        });

    });



    //Saves a weapongroup works
    app.post("/weaponGroup", function (req, res) {
        var weaponGroup = new WeaponGroupModel({
            name: req.body.name,
            description: req.body.description
        });
        weaponGroup.save(function (error, result) {
            if(error){
                return res.status(400).send(error);
            }
            return result;
        });
    });



    app.post("/scoreCard", function (req, res) {
        var scoreCard = new ScoreCardModel({
            competitionNumber: req.body.competitionNumber,
            competitor: []
        });
        PersonModel.find({name: req.body.mail}, function(error, person){
            scoreCard.competitor.push(person[0])
        });
        scoreCard.save(function (error, result) {
            if(error){
                return res.status(400).send(error);
            }
            return result;
        });
    });

    //Saves a weaponclass works
    app.post("/weaponClass", function (req, res) {
        var weaponClass = new WeapondClassModel({
            description: req.body.description,
            weaponName: req.body.weaponName
        });
        weaponClass.save(function (error, result) {
            if(error){
                return res.status(400).send(error);
            }
            return result;
        });
    });

    /**
     * Save a club works
     */
    app.post("/club", function (req, res) {
        var club = new ClubModel({
            mail: req.body.mail,
            name: req.body.name,
            address: req.body.address
        });
        club.save(function (error, result) {
            if(error){
                return res.status(400).send(error);
            }
            return result;
        });
    });

    //Modify club

    /**
     * adds a contactperson expect clubname and person mail works
     */
    app.post("/club/contactPerson", function (req, res) {

        PersonModel.find({mail: req.body.mail}, function (error, person) {
                if (error) {
                    return res.status(400).send(error);
                }


            ClubModel.find({name: req.body.name}, function(error, club){

                    if (error) {
                        return res.status(400).send(error);
                    }

                if (club[0] != null) {

                        club[0].contactPersons.push(person[0]);
                        club[0].save(function (error, result) {
                            if (error) {
                                return res.status(400).send(error);
                            }
                            res.send(club[0]);
                        });

                    }
                    else {
                        res.status(500).send("error saving");
                    }
                });

        });
    });

    /**
     * Adds a competition to the club, expects competitionnumber and club name in body
     * not working
     */
    app.post("/club/competition", function (req, res) {
        ClubModel.find({name: req.body.name}, function(error, club){
            if(error){
                return res.status(400).send(error);
            }
            console.log(club);
            CompetitionModel.find({competitionNumber: req.body.competitionNumber}, function(error, competition){
                if(error){
                    return res.status(400).send(error);
                }
                club[0].competitions.push(competition[0]);
                club[0].save(function (error, result) {
                    if(error){
                        return res.status(400).send(error);
                    }
                    res.send(club[0]);
                });
            });
        });
    });




    app.post("/team/competitors", function (req, res) {
        TeamModel.find({teamNumber: req.body.teamNumber, competitionNumber: req.body.competitionNumber}, function (error, team) {
            if (error) {
                return res.status(400);
            }

            var competitors = req.body.competitors;
            for (var i in competitors) {
                PersonModel.find({mail: competitors[i]}, function (error, person) {
                    if (error) {
                        return res.status(400);
                    }
                    team[0].competitors.push(person[0]);
                    team[0].save(function (error, result) {
                        if (error) {
                            return res.status(400);
                        }
                        console.log("competitor added to team: " +  req.body.teamNumber);

                    })
                });
            }
            res.send(team)

        });
    });





    //Update competition:

    //Saves a team to the competition with matching competitionnumber
    app.post("/competition/team", function (req, res) {
        var team = new TeamModel({
            teamNumber: req.body.teamNumber,
            competitionNumber: req.body.competitionNumber,
            startTime: req.body.startTime,
            competitors: []
        });

        team.save(function(error, result){
            if(error){
                return res.status(400).send(error);
            }
        });
            CompetitionModel.find({competitionNumber: req.body.competitionNumber}, function(error, competition) {
                if (error) {
                    return res.status(400).send(error);
                }
                if (competition[0] != null) {

                    competition[0].teams.push(team);
                    competition[0].save(function (error, result) {
                        if (error) {
                        return res.status(400).send(error);
                    }
                        res.send(competition[0]);
                    });
                }
                else{
                    res.status(500).send("error saving");
                }
            });

    });




    /**
     * adds a standplass to a competition
     * standplass identified by number in numbers array body, competition identified by competitionNumber
     */
    app.post("/competition/standplass", function (req, res) {


            CompetitionModel.find({competitionNumber: req.body.competitionNumber}, function(error, competition){
                if(error){
                    return res.status(400);
                }

                var numbers = req.body.numbers;
                for(var i in numbers){
                    StandplassModel.find({number: numbers[i]}, function(error, standplass){
                        if(error){
                            return res.status(400);
                        }
                        console.log("La til standplass: " + numbers[i] + " i competition: " + req.body.competitionNumber );
                        competition[0].standplasses.push(standplass[0]);
                        competition[0].save(function(error, result){

                            if(error){
                                return res.status(400);
                            }
                        })
                    })
                }
                res.send(competition[0]);
        });

    });


    /**
     * Saves a club to a competition. requires name of club and competitionNumber
     */
    app.post("/competition/club", function (req, res) {

            CompetitionModel.find({competitionNumber: req.body.competitionNumber}, function(error, competition){
                if(error){
                    return res.status(400).send(error);
                }
                competition[0].club = req.body.name;
                competition[0].save(function(error, result){
                    if(error){
                        return res.status(400).send(error);
                    }
                    res.send(competition[0]);
                });
            });
        });


    /**
     * Saves a competitor to a competition. requires mail and competitionNumber
     */
    app.post("/competition/competitor", function (req, res) {
        console.log("hei");

            CompetitionModel.find({competitionNumber: req.body.competitionNumber}, function(error, competition){
                if(error){
                    return res.status(400);
                }
                var competitors = req.body.competitors;
                console.log(competitors);
                for(var i in competitors){
                PersonModel.find({mail: competitors[i]}, function(error, person) {
                    if (error) {
                        return res.status(400).send(error);
                    }
                    competition[0].competitors.push(person[0]);

                    competition[0].save(function(error, result){
                        if(error){
                            return res.status(400);
                        }
                    });
                });

                }

                res.send(competition[0]);
        });
    });

    /**
     * Adds a referee to competition. need mail and competitionnumber in body
     */
    app.post("/competition/referee", function (req, res) {
        PersonModel.find({mail: req.body.mail}, function(error, person){
            if(error){
                return res.status(400).send(error);
            }
            CompetitionModel.find({competitionNumber: req.body.competitionNumber}, function(error, competition){
                if(error){
                    return res.status(400).send(error);
                }
                competition[0].referees.push(person[0]);
                competition[0].save(function(error, result){
                    if(error){
                        return res.status(400).send(error);
                    }
                    res.send(competition[0]);
                });
            });
        });
    });

    /**
     * Adds a competitionleader to competition. need mail and competitionnumber in body
     */
    app.post("/competition/competitionLeader", function (req, res) {
        PersonModel.find({mail: req.body.mail}, function(error, person){
            if(error){
                return res.status(400).send(error);
            }
            CompetitionModel.find({competitionNumber: req.body.competitionNumber}, function(error, competition){
                if(error){
                    return res.status(400).send(error);
                }
                competition[0].competitionLeaders.push(person[0]);
                competition[0].save(function(error, result){
                    if(error){
                        return res.status(400).send(error);
                    }
                    res.send(competition[0]);
                });
            });
        });
    });

    /**
     * Adds a weaponclass to a competition. need name of weaponclass and competitionNumber in body
     */
    app.post("/competition/weaponClass", function (req, res) {
        WeapondClassModel.find({weaponName: req.body.weaponName}, function(error, weaponClass){
            if(error){
                return res.status(400).send(error);
            }
            CompetitionModel.find({competitionNumber: req.body.competitionNumber}, function(error, competition){
                if(error){
                    return res.status(400).send(error);
                }
                competition[0].weaponClasses.push(weaponClass[0]);
                competition[0].save(function(error, result){
                    if(error){
                        return res.status(400).send(error);
                    }
                    res.send(competition[0]);
                });
            });
        });
    });

    /**
     * Adds a weaponGroup to competition. need weaponName and competitionnumber in body
     */
    app.post("/competition/weaponGroup", function (req, res) {
        WeaponGroupModel.find({name: req.body.name}, function(error, weaponGroup){
            if(error){
                return res.status(400).send(error);
            }
            CompetitionModel.find({competitionNumber: req.body.competitionNumber}, function(error, competition){
                if(error){
                    return res.status(400).send(error);
                }
                competition[0].weaponGroups.push(weaponGroup[0]);
                competition[0].save(function(error, result){
                    if(error){
                        return res.status(400).send(error);
                    }
                    res.send(competition[0]);
                });
            });
        });
    });


}


module.exports = appRouter;