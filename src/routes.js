const express = require('express');
const sqlite = require('sqlite3').verbose();

const routes = express.Router();

const db = new sqlite.Database(__dirname + '/teachers.db', sqlite.OPEN_READWRITE, err => {
    if(err){
        console.log(err.message);
        return;
    }

    console.log('Database Connected.');

});



routes.get('/', (req, res) => {
    res.render('index');

});

routes.get('/study', (req, res) => {    
    const query = `
        SELECT id, name, picture, whatsapp, biograph, subject, cost 
        FROM tbTeachers
        ORDER BY id DESC
        LIMIT 5;
    `;

    db.all(query, (err, Articles) => {
        if(err){
            console.log(err.message);
            return;

        }

        res.render('study', {Articles});

    });
});

routes.get('/study-filtered', (req, res) => {
    const query2 = `
    SELECT id, name, picture, whatsapp, biograph, subject, cost, week_day, time_01, time_02
    FROM tbTeachers
    WHERE subject = ? AND week_day = ? AND time_01 <= ? AND time_02 >= ?
    ORDER BY id DESC
    `;

    const r = req.query;
    const filtered= {
        filter: true
    };
    
    db.all(query2, [r.subject, r.weekday, r.time, r.time], (err, Articles) => {
        if(err){
            console.log(err.message);
            return;

        }

        res.render('study', {Articles, filtered});

    });
});

routes.get('/teach', (req, res) => {
    res.render('teach');

});

routes.get('/success', (req, res) => {
    res.render('success');
    
});


routes.post('/teach', (req, res) => {
    const add = `
        INSERT INTO tbTeachers (
            name,
            picture,
            whatsapp,
            biograph,
            subject,
            cost,
            week_day,
            time_01,
            time_02
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const r = req.body;

    db.run(add, 
        [r.complete_name, r.picture_url, r.whatsapp_number, r.bio, r.subject, r.cost, r.weekday, r.from_time, r.to_time], 
        (err) => {
            if(err){
                console.log(err.message);
                return;
            }

            res.redirect('success');

        });
});


module.exports = routes;

