import React, { useState, useEffect } from 'react';
import '../../css/AdmiVentaCss/AperturaPage.css';
import { TbBackground } from 'react-icons/tb';
import { useAuth } from '../../context/AuthContext';
import { insertarNuevaApertura, cerrarAperturaAbierta } from '../../api/auth';

function AperturaPage() {
    const { existeApertura, setExisteApertura, AperturaID, tableApertura } = useAuth();
    const [mostar, setMostrar] = useState(false);
    const [mostarInicioApertura, setMostrarInicioApertura] = useState(false);
    const [mostrarNuevaApertura, setMostrarNuevaApertura] = useState(true);
    const [mostrarCierreApertura, setMostrarCierreApertura] = useState(false);
    const [mostarNuevoCierreApertura, setMostarNuevoCierreApertura] = useState(false);
    const [cajaChica, setCajaChica] = useState(0);
    const [diferenciaEfectivo, setDiferenciaEfectivo] = useState(0);
    const [diferenciaQr, setDiferenciaQr] = useState(0);
    const [diferenciaTarjeta, setDiferenciaTarjeta] = useState(0);
    const [recuentoEfectivo, setRecuentoEfectivo] = useState('');
    const [recuentoQr, setRecuentoQr] = useState('');
    const [recuentoTarjeta, setRecuentoTarjeta] = useState('');

    useEffect(() => {
        if (existeApertura) {
            setMostrarNuevaApertura(false);
            setMostrarCierreApertura(true);
        } else {
            setMostrarNuevaApertura(true);
            setMostrarCierreApertura(false);
        }
    }, [existeApertura]);

    const handleCajaChicaChange = (e) => {
        const value = parseFloat(e.target.value);
        setCajaChica(value >= 0 ? value : 0);
    };

    const crearApertura = async () => {
        try {
            const datos = {
                CajaChica: cajaChica || 0,
                FechaInicio: new Date().toISOString().split('T')[0],
                HoraInicio: new Date().toLocaleTimeString(),
            };
            console.log(datos);
            await insertarNuevaApertura(datos);
        } catch (error) {
            console.log(error);
        }
    };

    const cerrarApertura = async () => {
        try {
            const datos = {
                AperturaID,
                FechaCierre: new Date().toISOString().split('T')[0],
                HoraFin: new Date().toLocaleTimeString(),
                CajaChica: cajaChica,
                SaldoEfectivo: tableApertura.SaldoEfectivo,
                SaldoQr: tableApertura.SaldoQr,
                SaldoTarjeta: tableApertura.SaldoTarjeta,
                recuentoEfectivo,
                recuentoQr,
                recuentoTarjeta,
            };
            await cerrarAperturaAbierta(datos);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEfectivo = (e) => {
        const nuevoValor = Number(e.target.value);
        setRecuentoEfectivo(nuevoValor);
        setDiferenciaEfectivo(tableApertura.SaldoEfectivo - nuevoValor);
    };

    const handleQR = (e) => {
        const nuevoValor = Number(e.target.value);
        setRecuentoQr(nuevoValor);
        setDiferenciaQr(tableApertura.SaldoQr - nuevoValor);
    };

    const handleTarjeta = (e) => {
        const nuevoValor = Number(e.target.value);
        setRecuentoTarjeta(nuevoValor);
        setDiferenciaTarjeta(tableApertura.SaldoTarjeta - nuevoValor);
    };

    return (
        <div className='contieneApertura'>
            <h2>Apertura y Cierre del Punto de Venta el Bunker</h2>

            {mostar && (
                <div className='aperturas'>
                    <div className='cuentas'>
                        <h3 id='c1'>Cuenta</h3>
                        <h3 id='c1'>Saldo Teórico</h3>
                        <h3 id='c1'>Recuento</h3>
                        <h3 id='c1'>Diferencia</h3>
                        <h3 id='c1'>Caja Chica</h3>
                    </div>
                    <div className='cuentas'>
                        <h4 id='c1'>Pago por Efectivo</h4>
                        <input type="number" value={tableApertura.SaldoEfectivo} disabled style={{ backgroundColor: "lightgray" }} />
                        <input type="number" value={recuentoEfectivo} onChange={handleEfectivo} />
                        <input type="number" value={diferenciaEfectivo} disabled style={{ backgroundColor: "lightgray" }} />
                        <input type="number" name="CajaChica" value={existeApertura ? cajaChica : tableApertura.CajaChica} onChange={handleCajaChicaChange} />
                    </div>
                    <div className='cuentas'>
                        <h4 id='c1'>Pago por QR</h4>
                        <input type="number" value={tableApertura.SaldoQr} disabled style={{ backgroundColor: "lightgray" }} />
                        <input type="number" value={recuentoQr} onChange={handleQR} />
                        <input type="number" value={diferenciaQr} disabled style={{ backgroundColor: "lightgray" }} />
                    </div>
                    <div className='cuentas'>
                        <h4 id='c1'>Pago por Tarjeta</h4>
                        <input type="number" value={tableApertura.SaldoTarjeta} disabled style={{ backgroundColor: "lightgray" }} />
                        <input type="number" value={recuentoTarjeta} onChange={handleTarjeta} />
                        <input type="number" value={diferenciaTarjeta} disabled style={{ backgroundColor: "lightgray" }} />
                    </div>
                    <div className='cuentas'>
                        <h4 id='c1'>Sub Total</h4>
                        <input type="number" />
                    </div>
                    <div className='cuentas'>
                        <h4 id='c1'>Total</h4>
                        <input type="number" />
                    </div>
                </div>
            )}

            {mostrarNuevaApertura && (
                <button onClick={() => { 
                    setMostrar(true); 
                    setMostrarInicioApertura(true); 
                    setMostrarNuevaApertura(false); 
                }}>Nueva Apertura</button>
            )}

            {mostarInicioApertura && (
                <button onClick={() => { 
                    setMostrar(false); 
                    setMostrarCierreApertura(true); 
                    setMostrarInicioApertura(false); 
                    crearApertura(); 
                }}>Iniciar Apertura</button>
            )}

            {mostrarCierreApertura && (
                <button onClick={() => { 
                    setMostrar(true); 
                    setMostarNuevoCierreApertura(true); 
                    setMostrarCierreApertura(false); 
                }}>Comenzar Cierre</button>
            )}

            {mostarNuevoCierreApertura && (
                <button onClick={() => { 
                    setMostrar(false); 
                    setMostrarNuevaApertura(true); 
                    setMostarNuevoCierreApertura(false); 
                    setExisteApertura(false); 
                    cerrarApertura(); }}>Cerrar Apertura</button>
            )}
        </div>
    );
}

export default AperturaPage;
