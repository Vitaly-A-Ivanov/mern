const {Router} = require('express') // get router from express
const config = require('config') // const config entries
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const shortid = require('shortid')
const router = Router() // create router

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')
    const {from} = req.body // address where link come from, support redirect in future

    const code = shortid.generate() // get unique code

    const existing = await Link.findOne({from}) // check if the same link exists in db

    if (existing) {
      return res.json({link: existing}) // respond a link to the user if already exists
    }
    const to = baseUrl + '/t/' + code // generate a new link


    // create a link object with given parameters
    const link = new Link({
      code, to, from, owner: req.user.userId
    })

    await link.save() // save a link in a database

    res.status(201).json({link}) // return a link

  } catch (e) {
    res.status(500).json({message: 'Something went wrong, try again!'})
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({owner: req.user.userId}) // db enquiry for specific link
    res.json(links)
  } catch (e) {
    res.status(500).json({message: 'Something went wrong, try again!'})
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({message: 'Something went wrong, try again!'})
  }
})

// export router
module.exports = router