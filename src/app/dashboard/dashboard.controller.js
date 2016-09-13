(function() {
    'use strict';

    angular
        .module('classroomApp')
        .controller('DashboardController', DashboardController);

    //injecting movie factory to search controller
    DashboardController.$inject = ['assignmentFactory', 'projectFactory', 'studentFactory'];

    function DashboardController(assignmentFactory, projectFactory, studentFactory) {
        var vm = this;


        function activateStudents() {
            studentFactory.getStudents().then(
                function(students) {
                    vm.students = students;
                },
                function(error) {}
            );
        }

        activateStudents();

        function activateProjects() {
            projectFactory.getProjects().then(
                function(projects) {
                    vm.projects = projects;
                },
                function(error) {}
            );
        }

        activateProjects();

        function activateAssignments() {
            assignmentFactory.getAssignments().then(
                function(assignments) {
                    vm.assignments = assignments;
                },
                function(error) {}
            );
        }

        activateAssignments();




    }

})();
