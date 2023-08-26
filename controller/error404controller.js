exports.geterror404 = (req, res, next) => {
    res.status(404).render('page404', { pageTitle: 'ERROR : 404' });
}


