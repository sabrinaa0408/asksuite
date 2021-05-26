const moment = require('moment');

module.exports = {
    validateBuscar: (req) => {
        const checkin = moment(req.body.checkin, "DD/MM/YYYY");
        const checkout = moment(req.body.checkout, "DD/MM/YYYY");

        let validacao = {
            nome: 'Invalido',
            isValid: false
        }
        if (!checkin.isValid() || !checkout.isValid()){
            validacao.message = 'Parâmetro obrigatório não existe ou incorreto';
        } else if (!moment().isBefore(checkin)) {
            validacao.message = 'O check-in deve ser definido para uma data futura!'
        }else if(!checkin.isBefore(checkout)){
            validacao.message = 'O check-out deve ser após o check-in';
        } else {
            validacao.isValid = true;
        }
        
        return validacao;
    }
}


