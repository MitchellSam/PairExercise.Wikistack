const express = require('express');
const router = express.Router();

const { Page } = require("../models");
const { addPage } = require("../views");

router.get('/', (req, res, next) => {
    res.send('got to GET wiki')
})

router.post('/', async (req, res, next) => {

    // STUDENT ASSIGNMENT:
    // add definitions for `title` and `content`
  
    const page = new Page({
      title: req.body.title,
      content: req.body.content
    });
  
    // make sure we only redirect *after* our save is complete!
    // note: `.save` returns a promise.
    try {
      await page.save();
      res.redirect('/');
    } catch (error) { next(error) }

    console.log(page)
  });

router.get('/add', (req, res, next) => {
    //const addPage = require('../views/addPage')
    const html = addPage()
    res.send(html)
})

module.exports = router;