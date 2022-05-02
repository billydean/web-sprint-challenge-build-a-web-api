// Write your "projects" router here!
const express = require('express');
const Project = require('./projects-model');
const {
    validateProject,
    validateProjectId,
    validateCompleted,
} = require('./projects-middleware');
const db = require('../../data/dbConfig.js');

const router = express.Router();

/**
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
router.post('/', validateProject, (req,res) => {
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(err => {console.error(err)})
})
router.put('/:id', validateCompleted, validateProjectId, (req,res) => {
    Project.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {console.error(err)})
        
})
router.delete('/:id', validateProjectId, async (req,res) => {
    const deleted = await Project.get(req.params.id);
    Project.remove(req.params.id)
        .then(()=> {
            res.json(deleted);
        })
        .catch(err => {console.error(err)})
})
router.get('/:id/actions', validateProjectId, (req,res) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            res.json(actions);
        })
        .catch(err=>{console.error(err)})
})

module.exports = router;