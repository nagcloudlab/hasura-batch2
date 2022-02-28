
const express = require('express')
const app = express();

// datasource
const photos = [
    {
        id: 1,
        photo_url: "https://picsum.photos/200/300",
        description: "this is first photo",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        user_id: "Nag"
    },
    {
        id: 2,
        photo_url: "https://picsum.photos/200/300",
        description: "this is second photo",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        user_id: "Diya"
    }
]
const comments = {
    1: [
        { id: 11, comment: "this is first comment" },
        { id: 22, comment: "this is second comment" }
    ],
    2: [
        { id: 33, comment: "this is first comment" },
    ]
}

// rest endpoints
app.get("/api/v1/photos", (req, res) => {
    res.status(200).json(photos)
})
app.get("/api/v1/photos/:id", (req, res) => {
    let { id } = req.params
    const photo = photos.find(p => p.id === parseInt(id))
    res.status(200).json(photo)
})
app.get("/api/v1/photos/:id/comments", (req, res) => {
    let { id } = req.params
    const photoComments = comments[parseInt(id)] || []
    res.status(200).json(photoComments)
})


app.listen(3000, () => {
    console.log("server running at http://localhost:3000/")
})