function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/');
  }
  next()
}

function checkRoleAdmin(req,res,next){
  const errors = {}
  if(req.session.user.role !== "Admin"){
    errors.msg = "You must login first"
    return res.redirect("/admin?errors="+JSON.stringify(errors))
  }
  next()
}
function checkRoleUser(req,res,next){
  const errors = {}
  if(req.session.user.role !== "User"){
    return res.redirect("/?errors="+JSON.stringify(errors))
  }
  next()
}

module.exports = { requireLogin, checkRoleAdmin ,checkRoleUser};