// Write your "projects" router here!
const express = require('express');
const Project = require('./projects-model');
const pm = require('./projects-middleware');
const db = require('../../data/dbConfig.js');

const router = express.Router();

/**

 [GET] /api/projects/:id
Returns a project with the given id as the body of the response.
If there is no project with the given id it responds with a status code 404.
 [POST] /api/projects
Returns the newly created project as the body of the response.
If the request body is missing any of the required fields it responds with a status code 400.
 [PUT] /api/projects/:id
Returns the updated project as the body of the response.
If there is no project with the given id it responds with a status code 404.
If the request body is missing any of the required fields it responds with a status code 400.
 [DELETE] /api/projects/:id
Returns no response body.
If there is no project with the given id it responds with a status code 404.
 [GET] /api/projects/:id/actions
Returns an array of actions (could be empty) belonging to a project with the given id.
If there is no project with the given id it responds with a status code 404.
 */

router.get('/', (req,res) => {
    Project.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(err => {
            console.log(err)
        })
})
router.get('/:id', async (req,res) => {
    try {
        const project = await Project.get(req.params.id);
        if (!project) {
            res.status(404).json({message: "oops, no project"});
        } else {
            res.status(200).json(project);
        }
    } catch (err) {
        console.log(err.message);
    }
})
// router.post('/', (req,res) => {

// })
// router.put('/:id', (req,res) => {

// })
// router.delete('/:id', (req,res) => {

// })
// router.get('/:id/actions', (req,res) => {

// })

module.exports = router;