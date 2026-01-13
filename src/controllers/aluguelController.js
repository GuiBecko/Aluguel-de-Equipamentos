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
exports.indexID = async (req, res) => {
  if(!req.params.id) return res.render('404')
    
  const aluguel = await Aluguel.buscaPorId(req.params.id)
  
  if(!aluguel) return res.render('404')
    
  res.render('aluguel', { aluguel })
}
exports.delete = async (req, res) => {
  if(!req.params.id) res.render('404')

  const aluguel = await Aluguel.delete(req.params.id)

  if(!aluguel) {
    res.render('404')
    return
  }
  req.flash('success', "Aluguel apagado com sucesso")
  req.session.save(() => res.redirect('/aluguel/index'))
  return
}
exports.edit = async (req, res) => {
  if(!req.params.id){
    res.render('404')
  }else{
    const aluguel = await Aluguel.buscaPorId(req.params.id)
    res.render('aluguelEdit', { aluguel })
  } 
}
exports.editPost = async(req, res) => {
  if(!req.params.id) res.render('404')
  
  const aluguel = new Aluguel(req.body)
  await aluguel.edit(req.params.id)

  if(aluguel.errors.length > 0){
    req.flash('errors', aluguel.errors)
    req.session.save(() => {
      res.redirect('/aluguel/index')
    })
    return
  }

  req.flash('success', "Aluguel editado com sucesso")
  req.session.save(() => {
      res.redirect('/aluguel/index')
  })
}
exports.find = async (req, res) => {
  try{

    if(!req.params.filtro || !req.params.valor){
      return res.redirect('aluguel/index')
    }
    
    const aluguel = await Aluguel.buscarComFiltro(req.params.filtro, req.params.valor)
    res.render('alugueis', { alugueis: aluguel })
  } catch(e){
    console.log(e)
    res.render('404')
  }
}