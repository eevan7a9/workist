'use strict';

angular.module('workingHoursTrello')
	.directive('salaryDir', function ($rootScope, totalSalaryS, nationalityS, holidayS, weekS, monthS) {
		return {
			link : function(scope, element, attrs){
          		function initialize() {
					scope.menuItem = ['months', 'salary', 'percentage', 'bonuse', 'total salary'];
					scope.getMonthDuration = (memberId) => totalSalaryS.monthDuration($rootScope.calendarLists, $rootScope.calendarCards, 'ENTERING DATE', $rootScope.dt.Date, memberId);
					scope.getCurrentSalary = (memberId, monthNumber) => totalSalaryS.salary($rootScope.calendarLists, $rootScope.calendarCards, 'ENTERING DATE', memberId, monthNumber);
					scope.getPercentage = (memberId) => {
						// We get the number of annual leave currently used
						let country = nationalityS.membersNationality(memberId, $rootScope.calendarCards, $rootScope.calendarLists); /** get members nationality */
						let possibleWork = totalSalaryS.prevMonthsToWorkDates($rootScope.calendarLists, $rootScope.calendarCards, 'ENTERING DATE', $rootScope.dt.Date, memberId); /** all working days holidays not considered */
						let prevMonthToWork = holidayS.datesWithoutHoliday(country, $rootScope.dt.year, $rootScope.calendarLists, $rootScope.calendarCards, possibleWork); /** all the working days with holidays remove */
						let allDatesToNow =  totalSalaryS.betweenDates(new Date(`${$rootScope.dt.Date.getFullYear()}/01/1`), $rootScope.dt.Date, true); /** we get all the Dates */
						let prevMonthsDates = totalSalaryS.prevMonthsDate(allDatesToNow); /** we get all the dates from jan 1 to last Day of last month */
						let prevMonthsWork = weekS.getDaysTotalOutput(prevMonthsDates, memberId, $rootScope.boardLists, $rootScope.boardCards); /** all the days members have worked */
						let usedLeave = prevMonthToWork - prevMonthsWork; /** annual Leave used */
						// We get the annual Leave members have
						let myAnnualLeave = totalSalaryS.annualLeaves($rootScope.calendarLists, $rootScope.calendarCards, 'ENTERING DATE', $rootScope.dt.Date, memberId) /** annual leave up to now */
						// We get the available annual Leave
						let availableLeave = myAnnualLeave - usedLeave /** available annual Leave */
						// We get the number of days to work for this month
						let currentMonthsDate = monthS.monthsNeedtoWork($rootScope.dt.year, $rootScope.dt.month); /** dates of current Month */
						let monthToWork = holidayS.datesWithoutHoliday(country, $rootScope.dt.year, $rootScope.calendarLists, $rootScope.calendarCards, currentMonthsDate);  /** this month current month to Work */
						// We get the number of days to work until now
						let monthStarted = new Date($rootScope.dt.year + '/' + $rootScope.dt.month + '/1');
						let monthToNow = totalSalaryS.betweenDates(monthStarted, $rootScope.dt.Date);
						let daysToWork = holidayS.datesWithoutHoliday(country, $rootScope.dt.year, $rootScope.calendarLists, $rootScope.calendarCards, monthToNow);
						// We get the number of days have worked 
						let currentWorked = monthS.getMonthsValue($rootScope.dt.year, $rootScope.dt.month, $rootScope.boardLists, memberId, $rootScope.boardCards);
						while (daysToWork > currentWorked) {
							if (availableLeave > 0) {
								currentWorked = currentWorked + 0.5;
								availableLeave = availableLeave - 0.5;
							}else{ break;}
						}
						return totalSalaryS.percentage(currentWorked, monthToWork);
						// return "annual Leave: "+ myAnnualLeave + " Used Leave: " + usedLeave + " Available Leave: " + availableLeave;
					}
					scope.getBonuse = () => '(the Bonuse)';
					scope.getTotalSalary = () => 'the total www';
				}
				initialize();
			},
			restrict: "EA",
			replace: true,
			scope: {},
			templateUrl: "../../template/salary/directives/totalSalaryDir.html",
		}
	});
