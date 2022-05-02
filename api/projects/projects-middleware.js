// // add middlewares here related to projects

const Project = require('./projects-model');

// async function 

function validateProject(req,res,next) {
    const {name, description} = req.body;
    if (!name || !description) {
        res.status(400).json({message: "projects need both a name and a description!"})
    } else {
        next();
    }
}
async function validateProjectId(req,res,next) {
    const tested = await Project.get(req.params.id)
    if (!tested) {
        res.status(404).json({message: "no such project"})
    } else {
        next();
    }
}
function validateCompleted(req,res,next) {
    const {name, description, completed} = req.body;
    if (!name || !description || completed === undefined) {
        res.status(400).json({message: "projects need both a name and a description!"})
    } else {
        next();
    }
}
module.exports = {
    validateProject,
    validateProjectId,
    validateCompleted
}