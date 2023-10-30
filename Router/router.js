const express = require('express')
const Testing = require('../models')
const router = express.Router()


router.get('/testings', (req, res) => {
    Testing.find().then((doc) => {
        res.status(200).json(doc)
    }).catch((e) => {
        res.status(500).json(e)
    })
})


router.get('/testings/:id', (req, res) => {
    const _id = req.params.id
    Testing.find({_id}).then((doc) => {
        res.status(200).json(doc)
    }).catch((e) => {
        res.status(500).json(e)
    })
})


router.post('/testings', (req, res) => {
    const testing1 = new Testing(req.body)
    testing1.save().then((result) => {
        res.status(201).json(result)
    }).catch((e) => {
        res.status(500).json(e)
    })
})

router.patch('/testings/:id', (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).json('Not a valid update')
    }
    const _id = req.params.id
    Testing.findByIdAndUpdate(_id, req.body, {runValidators:true}).then((result) => {
        if(!result){
            res.status(404).json('Id not found')
        }
        res.status(201).json(result)
    }).catch((e) => {
        res.status(400).json('Bad client', e)
    })   
})


router.delete('/testings/:id', (req, res) => {
    const _id = req.params.id
    Testing.findByIdAndDelete({_id}).then((deletedFiles) => {
        if(!deletedFiles){
            return res.status(404).json('could not find file')
        }
        res.status(200).json(deletedFiles)
    }).catch((e) => {
        res.status(500).json(e)
    })
})

module.exports = router