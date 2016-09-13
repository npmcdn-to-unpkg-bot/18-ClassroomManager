(function() {
    'use strict';

    angular
        .module('classroomApp')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = ['projectFactory', 'studentFactory', 'assignmentFactory', '$ngBootbox', '$stateParams'];

    function ProjectDetailController(projectFactory, studentFactory, assignmentFactory, $ngBootbox, $stateParams) {
        var vm = this;

        activate();

        function activate() {
            studentFactory.getStudents().then(
                function(students) {
                    vm.students = students;
                },
                function(error) {}
            );
        }


        vm.currentProjectId = $stateParams.projectId;

        function activateAgain(id) {
            projectFactory.getProjectById(id).then(
                function(project) {
                    vm.project = project;
                },
                function(error) {}
            );
        }

        activateAgain(vm.currentProjectId);

        vm.addAssignment = function() {
            vm.newAssignment = {
                "projectId": vm.currentProjectId,
                "studentId": vm.selectedStudent.studentId
            };
            vm.saving = true;
            assignmentFactory.addAssignment(vm.newAssignment).then(
                function(assignments) {
                    vm.saving = false;
                    vm.project.assignments.push(assignments);
                },
                function(error) {}
            );
        };



        vm.editProject = function(project) {
            projectFactory.editProject(project).then(
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
                    var student = assignment.student.studentId;
                    var project = vm.project.projectId;
                    var index = vm.project.assignments.indexOf(assignment);
                    assignmentFactory.deleteAssignment(student, project).then(

                        function(student) {
                            vm.project.assignments.splice(index, 1);
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
