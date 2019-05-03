const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) =>{
    const  { nombre, apellidos, correo, fecha_nac, foto } = req.body;
    const newLink = {
        nombre,
        apellidos,
        correo,
        fecha_nac,
        foto,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Contacto guardado satisfactoriamente');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    console.log(links);
    res.render('links/list', {links: links});
});

router.get('/delete/:id', isLoggedIn, async (req, res) =>{
    const  { id } = req.params;
    pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Contacto eliminado satisfactoriamente');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { nombre, apellidos, correo, fecha_nac, foto } = req.body;
    const  newLink = {
        nombre,
        apellidos,
        correo,
        fecha_nac,
        foto
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Contacto actualizado satisfactoriamente');
    res.redirect('/links');
});

module.exports = router;