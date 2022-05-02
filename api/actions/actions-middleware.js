// add middlewares here related to actions
const Action = require('./actions-model');
const Project = require('../projects/projects-model')

async function validateActionId (req,res,next) {
    const tested = await Action.get(req.params.id);
    if (!tested) {
        res.status(404).json({message: "no such actions"})
    } else {
        next();
    }
}

function validateAction (req,res,next) {
    const {project_id, description, notes} = req.body;
    if (!project_id || !description || !notes) {
        res.status(400).json({message: "oops! something is missing"})
    } else {
        next();
    }
}


function validateCompleted (req,res,next) {
    const {completed} = req.body;
    if (completed === undefined) {
        res.status(400).json({message: "must be complete or incomplete"})
    } else {
        next();
    }
}

async function validateActionProject (req,res,next) {
    const tested = await Project.get(req.body.project_id);
    if (!tested) {
        res.status(404).json({message: "no such project"})
    } else {
        next();
    }
}

module.exports = {
    validateAction,
    validateActionId,
    validateCompleted,
    validateActionProject
}