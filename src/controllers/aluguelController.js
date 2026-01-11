const Aluguel = require ('../models/AluguelModel')

exports.Index = (req, res) => {
  try{
    res.render('alugueis');
  } catch(e){
    console.log(e)
  }
};
exports.register = (req, res) => {
  console.log('cheguei aqui')
  res.render('aluguelForm')
}
exports.create = async (req, res) => {
  try {
    const aluguel = new Aluguel(req.body)
    await aluguel.register()

    if(aluguel.errors.length > 0){
      req.flash('errors', aluguel.errors)
      req.session.save(function(){
        return res.redirect('/aluguel/register')
      })
      return
    }

    req.flash('success', 'Aluguel registrado com sucesso')
    req.session.save(function(){
      return res.redirect('/aluguel/index')
    })
  } catch(e) {
    console.log(e)
    res.render('404')
  }
}