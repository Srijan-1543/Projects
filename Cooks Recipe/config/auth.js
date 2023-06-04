module.exports = {
    EnsureAuthenticated: function(req,res,next) {
        if(req.isAuthenticated())
        {
            return next();
        }
        else
        {
            console.log('you were logged out');
            res.redirect('/auth/authenticate');
        }
    }
}