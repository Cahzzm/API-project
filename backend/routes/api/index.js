const router = require('express').Router();

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

module.exports = router;

// "Pn1xZSwT-IcbT3fTY1Vx7RlweUWgqMvK6cH4"
// fetch('/api/test', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `Pn1xZSwT-IcbT3fTY1Vx7RlweUWgqMvK6cH4`
//     },
//     body: JSON.stringify({ hello: 'world' })
//   }).then(res => res.json()).then(data => console.log(data));
