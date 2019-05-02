angular.module('workingHoursTrello').service('bonuseS', function(weekS, monthS, winS) {
    this.employeesFilter = (boardMembers) => { /** Filter members to get only employee */
        let employee = [];
        for (let i = 0; i < boardMembers.length; i++) {
            const member = boardMembers[i];
            if (member.fullName != "Sunwook" && member.fullName != "Gain") {
                employee.push(member)
            }
        }
        return employee
    }
    this.getLeader = (boardCards, members) => {
        for (let i = 0; i < boardCards.length; i++) {
            const card = boardCards[i];
            for (let z = 0; z < members.length; z++) {
                const member = members[z];
                for (let x = 0; x < card.labels.length; x++) {
                    const label = card.labels[x];
                    if (card.idMembers == member.id && label.name == 'leader') {
                        return member.id
                    }
                }
            }
        }
    }
    this.winner = (boardCards, members) => {
        let leader = this.getLeader(boardCards, members);
        let winTask = {id:'0', tasks: 0};
        let winTime = {id:'0', time: 0};
        for (let i = 0; i < members.length; i++) {
            const member = members[i];
            if (member.id != leader) {
                if (winTask.tasks < member.tasks) {
                    winTask.tasks = member.tasks;
                    winTask.id = member.id;
                    }
            }
        }
        for (let x = 0; x < members.length; x++) {
            const member = members[x];
            if (member.id != winTask.id && member.id != leader) {
                if (winTime.time < member.time) {
                    winTime.time = member.time;
                    winTime.id = member.id;
                    }
            }
        }
        return winner = {winTask: winTask.tasks, winTime: winTime.time, leader: leader};
      }
    this.bonuseTime = (year, month, boardMembers, boardLists, boardCards, calendarCards) => {

            let monthDateByDay = monthS.monthDaysDate(year, month); 
            let listsId = weekS.arrayListsID(monthDateByDay, boardLists); 
            let listsCards = winS.listsCards(boardCards, listsId);
            let employees = this.employeesFilter(boardMembers);
            let memberCards = winS.membersCards(employees, listsCards);
            let memberTotal = winS.MonthTotal(memberCards);
            let winnerBonuse = this.winner(calendarCards, memberTotal);
            return winnerBonuse
            // return winnerBonuse;
      
    }
  });