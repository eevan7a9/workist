angular.module('workingHoursTrello')
	.directive('birthdayDir',  function ($rootScope, calendarS, apiS, birthdayS) {
		return {
			link : function(scope, element, attrs){
				// Initialize Function Section
				scope.today = new Date();
				scope.currentMonth = scope.today.getMonth();
				scope.currentMonthName = moment(scope.currentMonth + 1, 'MM').format('MMMM');
				scope.currentYear = scope.today.getFullYear();
				scope.targetDay = 0;

				scope.selectedMember = 0;
				
				scope.next = function() {
					scope.currentYear = (scope.currentMonth === 11) ? scope.currentYear + 1 : scope.currentYear;
					scope.currentMonth = (scope.currentMonth + 1) % 12;
					scope.currentMonthName = moment(scope.currentMonth + 1, 'MM').format('MMMM');
					scope.targetDay = 0;
					calendarS.showCalendar(scope.currentMonth, scope.currentYear); /** Function to show Calendar */
					scope.selectedMember = 0;
				}
				scope.previous = function() {
					scope.currentYear = (scope.currentMonth === 0) ? scope.currentYear - 1 : scope.currentYear;
					scope.currentMonth = (scope.currentMonth === 0) ? 11 : scope.currentMonth - 1;
					scope.currentMonthName = moment(scope.currentMonth + 1, 'MM').format('MMMM');
					scope.targetDay = 0;
					calendarS.showCalendar(scope.currentMonth, scope.currentYear); /** Function to show Calendar */
					scope.selectedMember = 0;
				}
				scope.getToBirthday = function(id, month, year, day){ /** change Calendar base on the given month and year */
					scope.currentMonthName = moment(month + 1, 'MM').format('MMMM');
					scope.currentYear = scope.today.getFullYear();
					scope.currentMonth = month;
					scope.targetDay = day;
					calendarS.showCalendar(month, year);
			
					scope.selectedMember = id; 				
				}			
				/** to get Member Day of Birth and Name of Month */
				scope.getMemberBirthDate = (memberId) => birthdayS.getBirthdate(memberId, $rootScope.calendarLists, $rootScope.calendarCards, "BIRTHDAY");
				/** to get Member Birth Day */
				scope.getMemberBirthDay = (memberId) => birthdayS.getBirthday(memberId, $rootScope.calendarLists, $rootScope.calendarCards, "BIRTHDAY");
				/** to get Member Birth Month */
				scope.getMemberBirthMonth = (memberId) => birthdayS.getBirthMonth(memberId, $rootScope.calendarLists, $rootScope.calendarCards, "BIRTHDAY");
				/** to get Member Birth Year */
				scope.getMemberBirthYear = (memberId) => birthdayS.getBirthYear(memberId, $rootScope.calendarLists, $rootScope.calendarCards, "BIRTHDAY");
				/** to get Member current Age */	 
				scope.getMemberAge = (memberId) => birthdayS.getAge(memberId, $rootScope.calendarLists, $rootScope.calendarCards, "BIRTHDAY");
				/** Function to show Calendar */
				scope.initiateCalendar = () => calendarS.showCalendar(scope.currentMonth, scope.currentYear, $rootScope.calendarLists, $rootScope.calendarCards, "BIRTHDAY", scope.targetDay); 
					
					
			},
			restrict: "EA",
			replace: true,
			scope: {},
			templateUrl: "../template/calendar/directives/birthdayDir.html", /** if Initialize from workTimist.html */
			// templateUrl: "../../template/calendar/directives/birthdayDir.html"
	  	}
	});