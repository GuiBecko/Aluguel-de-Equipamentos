const Aluguel = require ('../models/AluguelModel')

exports.index = async (req, res) => {
  try{
    const alugueis = await Aluguel.buscaAlugueis()
    res.render('alugueis', { alugueis });
  } catch(e){
    console.log(e)
    res.render('404')
  }
};

exports.register = (req, res) => {
  try{
    res.render('aluguelForm')
  } catch(e){
    console.log(e)
    res.render('404')
  }
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