using Classroom.API.Infrastructure;
using Classroom.API.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace Classroom.Api.Controllers
{
    public class AssignmentsController : ApiController
    {
        private ClassroomDataContext db = new ClassroomDataContext();

        // GET: api/Assignments
        public IQueryable<Assignment> GetAssignments()
        {
            return db.Assignments;
        }

        // GET: api/Assignments/5/4
        [ResponseType(typeof(Assignment))]
        [HttpGet, Route("api/assignments/{studentId}/{projectId}")]
        public IHttpActionResult GetAssignment(int studentId, int projectId)
        {
            //Assignment assignment = db.Assignments.Find(id);

            var result = db.Assignments.Where(a => a.StudentId == studentId && a.ProjectId == projectId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // PUT: api/Assignments/5
        [ResponseType(typeof(void))]
        [HttpPut, Route("api/assignments/{studentId}/{projectId}")]
        public IHttpActionResult PutAssignment(int studentId, int projectId, Assignment assignment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (studentId != assignment.StudentId || projectId != assignment.ProjectId)
            {
                return BadRequest();
            }

            //db.Entry(assignment).State = EntityState.Modified;

            //var assignmentToBeUpdated = db.Students.Find(studentId);

            var assignmentToBeUpdated = db.Assignments.FirstOrDefault(a => a.StudentId == studentId && a.ProjectId == projectId);

            db.Entry(assignmentToBeUpdated).CurrentValues.SetValues(assignment);
            db.Entry(assignmentToBeUpdated).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignmentExists(studentId, projectId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Assignments
        [ResponseType(typeof(Assignment))]
        public IHttpActionResult PostAssignment(Assignment assignment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Assignments.Add(assignment);

            try
            {
                db.SaveChanges();

                assignment.Project = db.Projects.Find(assignment.ProjectId);
                assignment.Student = db.Students.Find(assignment.StudentId);
            }
            catch (DbUpdateException)
            {
                if (AssignmentExists(assignment.StudentId, assignment.ProjectId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = assignment.StudentId }, assignment);
        }

        // DELETE: api/Assignments/5
        [ResponseType(typeof(Assignment))]
        [HttpDelete, Route("api/assignments/{studentId}/{projectId}")]
        public IHttpActionResult DeleteAssignment(int studentId, int projectId)
        {
            Assignment assignment = db.Assignments.Find(studentId, projectId);
            if (assignment == null)
            {
                return NotFound();
            }

            db.Assignments.Remove(assignment);
            db.SaveChanges();

            return Ok(assignment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AssignmentExists(int studentId, int projectId)
        {
            return db.Assignments.Count(e => e.StudentId == studentId && e.ProjectId == projectId) > 0;
        }
    }
}