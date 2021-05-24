const moment = require('moment');

module.exports = {
    validateBuscar: (req) => {
        const checkin = moment(req.body.checkin, "DD/MM/YYYY");
        const checkout = moment(req.body.checkout, "DD/MM/YYYY");

        let validacao = {
            name: 'Inválida',
            valido: false
        }
        
        if (!checkin.valido() || !checkout.valido()){
            validacao.message = 'Parâmetro obrigatorio ou incorreto!';
        } else if (!checkin.isBefore(checkout)){
            validacao.message = 'Checkout deve ser após o Checkin';
        }else if(!moment().isBefore(checkin)) {
            validacao.message = 'Checkin deve ser uma data futura!'
        } else {
            validacao.valido = true;
        }
        return validacao;
    }
}


