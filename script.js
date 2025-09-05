document.addEventListener('DOMContentLoaded', function() {
    const horaEntradaInput = document.getElementById('horaEntrada');
    const horaSalidaInput = document.getElementById('horaSalida');
    const precioPorHoraInput = document.getElementById('precioPorHora');
    const bloquearPrecioCheckbox = document.getElementById('bloquearPrecio');
    const calcularCostoBtn = document.getElementById('calcularCosto');
    const costoDiarioSpan = document.getElementById('costoDiario');
    const costoSemanalSpan = document.getElementById('costoSemanal');
    const costoMensualSpan = document.getElementById('costoMensual');
    const horasDiaSpan = document.getElementById('horasDia');
    const diasSeleccionados = document.querySelectorAll('.days-selector input[type="checkbox"]');

    // Inicializar el estado del campo de precio por hora basado en el checkbox
    precioPorHoraInput.disabled = bloquearPrecioCheckbox.checked;

    // Escuchar el cambio en el checkbox de bloquear precio
    bloquearPrecioCheckbox.addEventListener('change', function() {
        precioPorHoraInput.disabled = this.checked;
    });

    calcularCostoBtn.addEventListener('click', function() {
        const horaEntrada = horaEntradaInput.value;
        const horaSalida = horaSalidaInput.value;
        const precioPorHora = parseFloat(precioPorHoraInput.value);

        if (!horaEntrada || !horaSalida) {
            alert('Por favor, ingrese la hora de entrada y la hora de salida.');
            return;
        }

        if (isNaN(precioPorHora)) {
            alert('Por favor, ingrese un precio por hora válido.');
            return;
        }

        const diferenciaHoras = calcularDiferenciaHoras(horaEntrada, horaSalida);
        const costoDiario = diferenciaHoras * precioPorHora;

        let diasSeleccionadosCount = 0;
        diasSeleccionados.forEach(dia => {
            if (dia.checked) {
                diasSeleccionadosCount++;
            }
        });

        const costoSemanal = costoDiario * diasSeleccionadosCount;
        const costoMensual = costoSemanal * 4;

        costoDiarioSpan.textContent = `$${costoDiario.toFixed(2)}`;
        costoSemanalSpan.textContent = `$${costoSemanal.toFixed(2)}`;
        costoMensualSpan.textContent = `$${costoMensual.toFixed(2)}`;
        horasDiaSpan.textContent = diferenciaHoras;
    });

    function calcularDiferenciaHoras(horaEntrada, horaSalida) {
        const entrada = new Date(`01/01/2023 ${horaEntrada}`);
        const salida = new Date(`01/01/2023 ${horaSalida}`);

        let diferencia = (salida.getTime() - entrada.getTime()) / (1000 * 60 * 60);

         // Asegurarse de que la diferencia sea positiva
        if (diferencia < 0) {
            diferencia = 24 + diferencia; // Sumar 24 horas si la hora de salida es antes que la de entrada
        }


        return diferencia;
    }
});
