(function() {
    'use strict';

    angular
        .module('classroomApp')
        .controller('StudentDetailController', StudentDetailController);

    StudentDetailController.$inject = ['projectFactory', 'studentFactory', 'assignmentFactory', '$ngBootbox', '$stateParams'];

    function StudentDetailController(projectFactory, studentFactory, assignmentFactory, $ngBootbox, $stateParams) {
        var vm = this;

        activate();

        function activate() {
            projectFactory.getProjects().then(
                function(projects) {
                    vm.projects = projects;
                },
                function(error) {}
            );
        }


        vm.currentStudentId = $stateParams.studentId;

        function activateAgain(id) {
            studentFactory.getStudentById(id).then(
                function(student) {
                    vm.student = student;
                },
                function(error) {}
            );
        }

        activateAgain(vm.currentStudentId);

        vm.addAssignment = function() {
            vm.newAssignment = {
                "projectId": vm.selectedProject.projectId,
                "studentId": vm.currentStudentId
            };
            vm.saving = true;
            assignmentFactory.addAssignment(vm.newAssignment).then(
                function(assignments) {
                    vm.saving = false;
                    vm.student.assignments.push(assignments);
                },
                function(error) {}
            );
        };



        vm.editStudent = function(student) {
            studentFactory.editStudent(student).then(
                function(success) {},
                function(error) {}
            );

        };

        vm.editAssignment = function(student, project, assignment) {
            assignmentFactory.editAssignment(student, project, assignment).then(
                function(success) {},
                function(error) {}
            );

        };


        vm.deleteAssignment = function(assignment) {
            $ngBootbox.confirm('Are you sure you want to delete this assignment?')
                .then(function() {
                    var student = vm.student.studentId;
                    var project = assignment.project.projectId;
                    var index = vm.student.assignments.indexOf(assignment);
                    assignmentFactory.deleteAssignment(student, project).then(
                        function(student) {
                            vm.student.assignments.splice(index, 1);
                        },
                        function(error) {}
                    );
                    console.log('Confirmed!');
                }, function() {
                    console.log('Confirm dismissed!');
                });
        };



    }

})();
