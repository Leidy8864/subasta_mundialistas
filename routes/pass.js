var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');

	router.get('/', function(req, res){
		res.render('pass.ejs');
	});

    router.get('/index', isLoggedIn, function(req, res){
        res.render('index.ejs', { user: req.user });
    });

	router.get('/login', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/index',
		failureRedirect: '/login',
		failureFlash: true
	}));

	router.get('/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/index',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	router.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', { user: req.user });
	});

	router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

	router.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/index',
	                                      failureRedirect: '/' }));

	router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	router.get('/auth/google/callback', 
	  passport.authenticate('google', { successRedirect: '/index',
	                                    failureRedirect: '/' }));


	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})

    //GET - Listar usuarios
    router.get('/users', function(req, res, next){
        User.find(function(err, users){
            if(err){return next(err)}
            res.json(users)
        })
    })

    //POST - Agregar users
    router.post('/user', function(req, res, next){
        var user = new User(req.body);
        console.log(req.body);
        user.save(function(err, user){
            if(err){ return next(err)}
                res.json(user);
        })
    })

    //DELETE - Eliminar users
    router.delete('/user/:id', function(req, res){
        User.findByIdAndRemove(req.params.id, function(err){
            if(err){res.send(err)}
                res.json({message: 'user eliminado'});
        })
    })


module.exports = router;

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}