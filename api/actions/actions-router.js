// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const {
    validateAction,
    validateActionId,
    validateCompleted,
    validateActionProject
} = require('./actions-middleware');

const router = express.Router();

router.get('/', (req,res) => {
    Action.get()
        .then(actions => {
            res.json(actions);
        })
        .catch(err => {
            console.log(err)
        })
});

router.get('/:id', validateActionId, (req,res) => {
    Action.get(req.params.id)
        .then(actions=> {
            res.json(actions)
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/', validateAction, validateActionProject, (req,res) => {
    Action.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction);
        })
        .catch(err => {console.error(err)})
})
router.put('/:id', validateAction, validateCompleted, validateActionId, (req,res) => {
    Action.update(req.params.id, req.body)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {console.error(err)})
        
})
router.delete('/:id', validateActionId, async (req,res) => {
    const deleted = await Action.get(req.params.id);
    Action.remove(req.params.id)
        .then(()=> {
            res.json(deleted);
        })
        .catch(err => {console.error(err)})
})
module.exports = router;